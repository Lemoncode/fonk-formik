import {
  ValidationSchema,
  ValidationResult,
  RecordValidationResult,
  FormValidationResult,
} from '@lemoncode/fonk';

/**
 * Main function to create an instance of FormikValidation. We could use `validateField`, `validateRecord` and/or `validateForm` to fire validations.
 *
 * **Arguments**
 * - ValidationSchema
 *
 * **Returns**
 *  - FormikValidation instance.
 */
export function createFormikValidation(
  validationSchema: ValidationSchema
): FormikValidation;

interface FormikValidation {
  validateField: (
    fieldId: string,
    value: any,
    values?: any
  ) => Promise<ValidationResult>;

  validateRecord: (values: any) => Promise<RecordValidationResult>;

  validateForm: (values: any) => Promise<FormValidationResult>;
}
