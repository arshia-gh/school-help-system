import { FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Validators } from "@angular/forms";

const required = (control: FormControl) => {
  if (!control.value || typeof control.value === 'string' && !control.value.trim()) {
    return {
      required: true
    }
  }
  return null
}

/**
 * Iterates through the given form group and touches all the fields,
 * including nested fields.
 * @param formGroup form group to touch its immediate and nested controls
 */
export const touchFormFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field)
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true })
    } else if (control instanceof FormGroup) {
      touchFormFields(control)
    }
  });
}

const helper = (
    cb: (err: ValidationErrors) => string,
    validator: ValidatorFn,
  ): ValidatorFn => {
    return (control) => {
      if (!validator) return null
      const err = validator(control)
      return err ? { message: cb(err) } : err
    }
  }

export const Required = (name: string) =>
  helper(
    err => `${name} is required`,
    Validators.required
  )

export const MaxLength = (maxLength: number, name: string) =>
  helper(
    err => `${name} must be at most ${err['maxlength'].requiredLength} characters`,
    Validators.maxLength(maxLength),
  )

export const MinLength = (minLength: number, name: string) =>
  helper(
    err => `${name} must be at least ${err['minlength'].requiredLength} characters`,
    Validators.minLength(minLength),
  )

export const RangeLength = (minLength: number, maxLength: number, name: string) => [
    MinLength(minLength, name),
    MaxLength(maxLength, name),
]

export const RRangeLength: typeof RangeLength = (...args) =>
  [Required(args[2]), ...RangeLength(...args)]
