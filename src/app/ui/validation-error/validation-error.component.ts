import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: '[validation-error][control]',
  template: `
    <ng-container *ngIf="hasError">
      {{control.errors?.['message'] ?? 'Something does look right'}}
    </ng-container>
  `,
})
export class ValidationErrorComponent {
  @Input('control') control!: FormControl

  get hasError() {
    return this.control.invalid && this.control.touched
  }
}
