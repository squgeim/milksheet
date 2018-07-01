export function createForm(self, formName, fields, validationSchema) {
  if (!self.state) {
    self.state = {};
  }

  self.state[formName] = fields.reduce((acc, fieldName) => {
    acc[fieldName] = {
      value: '',
      error: false,
      helperText: '',
    };

    return acc;
  }, {});

  const validateForm = getValidateFormFn(self, formName, validationSchema);
  const isFormValid = getIsFormValidFn(self, formName, validateForm);
  const handleChange = getHandleChangeFn(self, formName, validateForm);
  const handleBlur = getHandleBlurFn(self, formName, validateForm);

  return Object.freeze({
    formName,
    isFormValid,
    validateForm,
    handleChange,
    handleBlur,
  });
}

function getIsFormValidFn(self, formName, validateForm) {
  return function _isFormValid() {
    const form = self.state[formName];

    return Object.entries(form).filter(
      ([key, value]) => validateForm(key, value.value) === true
    );
  };
}

function getValidateFormFn(self, formName, validator) {
  return function _validateForm(id, value) {
    if (!validator && !self.validator) {
      console.warn(
        `I can't do any validation without the validator object in your class! :(`
      );

      return false;
    }

    const validationFn = (validator || self.validator)[id];

    if (typeof validationFn !== 'function') {
      return false;
    }

    const validation = validationFn(value);

    self.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        [id]: {
          ...prevState[formName][id],
          error: !!validation,
          helperText: validation || '',
        },
      },
    }));

    return !!validation;
  };
}

function getHandleChangeFn(self, formName, validateForm) {
  return function _handleChange(e) {
    const target = e.target;

    self.setState(prevState => ({
      [formName]: {
        ...prevState[formName],
        [target.id]: {
          ...prevState[formName][target.id],
          value: target.value,
        },
      },
    }));

    if (self.state[formName][target.id].error) {
      validateForm(target.id, target.value);
    }
  };
}

function getHandleBlurFn(self, formName, validateForm) {
  return function _handleBlur(e) {
    const target = e.target;

    validateForm(target.id, target.value);
  };
}
