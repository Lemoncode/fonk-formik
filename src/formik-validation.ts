import {
  FormValidationExtended,
  ValidationResult,
  ValidationSchema,
  createFormValidation,
} from '@lemoncode/fonk';

/*
Formik expects a validator to return null or undefined
  when  a given validation succeeds, adaptor to fulfill this
  requirement.
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
        [key]: errors[key] && !errors[key].succeeded ? errors[key].message : '',
      }),
      {}
    );

  public validateField(
    fieldId: string,
    value: any,
    values?: any
  ): Promise<string> {
    return this.formValidation
      .validateField(fieldId, value, values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult.message : null
      );
  }

  public validateRecord(
    values: any
  ): Promise<{ recordErrors: Record<string, string> }> {
    return this.formValidation.validateRecord(values).then(validationResult =>
      !validationResult.succeeded
        ? {
            recordErrors: {
              ...this.flatErrorsToMessages(validationResult.recordErrors),
            },
          }
        : null
    );
  }

  public validateForm(
    values: any
  ): Promise<
    Record<string, string> | { recordErrors: Record<string, string> }
  > {
    return this.formValidation.validateForm(values).then(validationResult =>
      !validationResult.succeeded
        ? {
            ...this.flatErrorsToMessages(validationResult.fieldErrors),
            recordErrors: this.flatErrorsToMessages(
              validationResult.recordErrors
            ),
          }
        : null
    );
  }
}

export const createFormikValidation = (
  validationSchema: ValidationSchema
): FormikValidation => new FormikValidation(validationSchema);
