import {
  FormValidationExtended,
  ValidationResult,
  ValidationSchema,
  FormValidationResult,
  createFormValidation,
} from '@lemoncode/fonk';

/*
Formik expects a validation to be thrown if there are errors
 */
export class FormikValidation {
  formValidation: FormValidationExtended.FormValidation = null;

  constructor(validationSchema: ValidationSchema) {
    this.formValidation = createFormValidation(validationSchema);
  }

  private flatErrorsToMessages = (errors: {
    [fieldId: string]: ValidationResult;
  }): Record<string, string> =>
    Object.keys(errors).reduce(
      (dest, key) => ({
        ...dest,
        [key]: errors[key] ? errors[key].message : '',
      }),
      {}
    );

  public validateField(fieldId: string, value: any, values?: any) {
    return this.formValidation
      .validateField(fieldId, value, values)
      .then(result => {
        if (!result.succeeded) {
          throw result.message;
        }

        return null;
      });
  }

  public validateRecord(values: any) {
    return this.formValidation.validateRecord(values).then(result => {
      if (!result.succeeded) {
        throw this.flatErrorsToMessages(result.recordErrors);
      }

      return null;
    });
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    return this.formValidation.validateForm(values).then(result => {
      if (!result.succeeded) {
        throw {
          ...this.flatErrorsToMessages(result.fieldErrors),
          ...this.flatErrorsToMessages(result.recordErrors),
        };
      }

      return null;
    });
  }
}

export const createFormikValidation = (
  validationSchema: ValidationSchema
): FormikValidation => new FormikValidation(validationSchema);
