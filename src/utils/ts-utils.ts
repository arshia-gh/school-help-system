import type { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export type FormStruct<T> = T extends Date ? FormControl<string>
: T extends object ? FormGroup<
  { [Prop in keyof T]: FormStruct<T[Prop]> }
> : FormControl<T>
