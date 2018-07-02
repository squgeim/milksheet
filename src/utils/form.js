// @flow

type Validator = (value: string) => string | boolean;

type ValidationSchema =
  | {
      [key: string]: Validator,
    }
  | {};

interface Component {
  state: Object;
  setState(callback: (prevState: Object) => Object): void;
  validator?: ValidationSchema;
}

type Field = {
  name: string,
  validator: Validator,
};

type FieldState = {
  value: string,
  error: boolean,
  helperText: string,
};

type ValidateForm = (id: string, value: string) => boolean;

type FieldEvent = {
  target: { id: string, value: string },
};

export function createForm(self: Component, formName: string, fields: Field[]) {
  if (!self.state) {
    self.state = {};
  }

  const form = {};
  const validationSchema: ValidationSchema = {};

  fields.forEach(field => {
    const fieldName = typeof field === 'string' ? field : (field || {}).name;

    if (typeof fieldName !== 'string') {
      throw new Error('Invalid form fields');
    }

    const fieldState: FieldState = {
      value: '',
      error: false,
      helperText: '',
    };

    form[fieldName] = fieldState;

    if (typeof field.validator === 'function') {
      validationSchema[fieldName] = field.validator;
    }
  });

  self.state[formName] = form;

  const validateForm = createValidateForm(self, formName, validationSchema);
  const isFormValid = createIsFormValid(self, formName, validateForm);
  const handleChange = createHandleChange(self, formName, validateForm);
  const handleBlur = createHandleBlur(self, formName, validateForm);
  const getFieldValue = createGetFieldValue(self, formName);

  return Object.freeze({
    formName,
    isFormValid,
    validateForm,
    handleChange,
    handleBlur,
    getFieldValue,
  });
}

function createIsFormValid(
  self: Component,
  formName: string,
  validateForm: ValidateForm
) {
  return function _isFormValid() {
    const form: { [key: string]: FieldState } = self.state[formName];

    return (
      Object.entries(form).filter(([key, value]) => {
        if (!value || typeof value.value !== 'string') {
          return false;
        }

        return validateForm(key, value.value) === true;
      }).length === 0
    );
  };
}

function createValidateForm(
  self: Component,
  formName: string,
  validator: ValidationSchema
) {
  return function _validateForm(id: string, value: string): boolean {
    if (!validator && !self.validator) {
      console.warn(
        `I can't do any validation without the validator object in your class! :(`
      );

      return false;
    }

    const validationFn = (validator || self.validator || {})[id];

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

function createHandleChange(
  self: Component,
  formName: string,
  validateForm: ValidateForm
) {
  return function _handleChange(e: FieldEvent) {
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

function createHandleBlur(
  self: Component,
  formName: string,
  validateForm: ValidateForm
) {
  return function _handleBlur(e: FieldEvent) {
    const target = e.target;

    validateForm(target.id, target.value);
  };
}

function createGetFieldValue(self: Component, formName: string) {
  return function _getFieldValue(fieldName: string) {
    const field = self.state[formName][fieldName];

    return field.value;
  };
}
