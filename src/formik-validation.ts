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

  public validateField(
    fieldId: string,
    value: any,
    values?: any
  ): Promise<ValidationResult> {
    // TODO
    return null;
  }

  public validateRecord(values: any): Promise<RecordValidationResult> {
    // TODO
    return null;
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    // TODO
    return null;
  }
}

export const createFormikValidation = (
  validationSchema: ValidationSchema
): FormikValidation => new FormikValidation(validationSchema);
