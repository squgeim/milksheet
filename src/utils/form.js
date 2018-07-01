export function createForm(self, formName, fields) {
  if (!self.state) {
    self.state = {};
  }

  const form = {};
  const validationSchema = {};

  fields.forEach(field => {
    const fieldName = typeof field === 'string' ? field : (field || {}).name;

    if (typeof fieldName !== 'string') {
      throw new Error('Invalid form fields');
    }

    form[fieldName] = {
      value: '',
      error: false,
      helperText: '',
    };

    if (typeof field.validator === 'function') {
      validationSchema[fieldName] = field.validator;
    }
  });

  self.state[formName] = form;

  const validateForm = createValidateForm(self, formName, validationSchema);
  const isFormValid = createIsFormValid(self, formName, validateForm);
  const handleChange = createHandleChange(self, formName, validateForm);
  const handleBlur = createHandleBlur(self, formName, validateForm);

  return Object.freeze({
    formName,
    isFormValid,
    validateForm,
    handleChange,
    handleBlur,
  });
}

function createIsFormValid(self, formName, validateForm) {
  return function _isFormValid() {
    const form = self.state[formName];

    return (
      Object.entries(form).filter(
        ([key, value]) => validateForm(key, value.value) === true
      ).length === 0
    );
  };
}

function createValidateForm(self, formName, validator) {
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

function createHandleChange(self, formName, validateForm) {
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

function createHandleBlur(self, formName, validateForm) {
  return function _handleBlur(e) {
    const target = e.target;

    validateForm(target.id, target.value);
  };
}
