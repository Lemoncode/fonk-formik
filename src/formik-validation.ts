import {
  FormValidationExtended,
  ValidationResult,
  ValidationSchema,
  RecordValidationResult,
  FormValidationResult,
  createFormValidation,
} from '@lemoncode/fonk';

/*
// TODO
Formik expects a validator to return ...
 */
export class FormikValidation {
  formValidation: FormValidationExtended.FormValidation = null;

  constructor(validationSchema: ValidationSchema) {
    this.formValidation = createFormValidation(validationSchema);
  }

  // Discuss here, Promise<any> return value is not really used
  public validateField(
    fieldId: string,
    value: any,
    values?: any
  ): Promise<ValidationResult> {
    return this.formValidation
      .validateField(fieldId, value, values)
      .then(result => {
        if (!result.succeeded) {
          throw result;
        }

        return null;
      });
  }

  public validateRecord(values: any): Promise<RecordValidationResult> {
    return this.formValidation.validateRecord(values).then(result => {
      if (!result.succeeded) {
        throw result;
      }

      return null;
    });
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    return this.formValidation.validateForm(values).then(result => {
      if (!result.succeeded) {
        throw result;
      }

      return null;
    });
  }
}

export const createFormikValidation = (
  validationSchema: ValidationSchema
): FormikValidation => new FormikValidation(validationSchema);
