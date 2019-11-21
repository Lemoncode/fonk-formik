import { set } from './helpers';

import {
  FormValidation,
  ValidationResult,
  ValidationSchema,
  createFormValidation,
  FormValidationResult,
} from '@lemoncode/fonk';

/*
Formik expects a validator to return null or undefined
  when  a given validation succeeds, adaptor to fulfill this
  requirement.
 */
export class FormikValidation {
  formValidation: FormValidation = null;

  constructor(validationSchema: ValidationSchema) {
    this.formValidation = createFormValidation(validationSchema);
  }

  private mapErrorsToFormikErrorMessageStructure = (errors: {
    [fieldId: string]: ValidationResult;
  }): Record<string, string> => {
    const formikErrors = {};

    for (const key of Object.keys(errors)) {
      const errorMessage =
        errors[key] && !errors[key].succeeded ? errors[key].message : '';
      set(formikErrors, key, errorMessage);
    }

    return formikErrors;
  };

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
              ...this.mapErrorsToFormikErrorMessageStructure(
                validationResult.recordErrors
              ),
            },
          }
        : null
    );
  }

  private validationResultContainsRecordErrors = (
    validationResult: FormValidationResult
  ) =>
    validationResult.recordErrors &&
    Object.keys(validationResult.recordErrors).length > 0;

  private buildFormikErrors = (validationResult: FormValidationResult) => {
    let formikErrors = {};

    // Build field errors:
    formikErrors = {
      ...this.mapErrorsToFormikErrorMessageStructure(
        validationResult.fieldErrors
      ),
    };

    // Build Record errors
    if (this.validationResultContainsRecordErrors(validationResult)) {
      formikErrors = {
        ...formikErrors,
        recordErrors: this.mapErrorsToFormikErrorMessageStructure(
          validationResult.recordErrors
        ),
      };
    }

    return formikErrors;
  };

  public validateForm(
    values: any
  ): Promise<
    Record<string, string> | { recordErrors: Record<string, string> }
  > {
    return this.formValidation.validateForm(values).then(validationResult =>
      !validationResult.succeeded
        ? this.buildFormikErrors(validationResult)
        : /*{
            ...this.flatErrorsToMessages(validationResult.fieldErrors),
            recordErrors: this.flatErrorsToMessages(
              validationResult.recordErrors
            ),
          }*/
          null
    );
  }

  /*
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
*/

  public updateValidationSchema(validationSchema: ValidationSchema): void {
    this.formValidation.updateValidationSchema(validationSchema);
  }
}

export const createFormikValidation = (
  validationSchema: ValidationSchema
): FormikValidation => new FormikValidation(validationSchema);
