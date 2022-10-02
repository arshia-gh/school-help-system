import type { FormControl, FormGroup } from "@angular/forms";

export type FormStruct<T, IsNullable extends boolean = false> = T extends object ? FormGroup<
  { [Prop in keyof T]: FormStruct<T[Prop], IsNullable> }
> : FormControl<IsNullable extends true ? T | null : T>
