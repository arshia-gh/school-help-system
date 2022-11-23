import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { AdminSignUpFormComponent } from '@app/forms/admin-sign-up-form/admin-sign-up-form.component';
import { VolunteerSignUpFormComponent } from '@app/forms/volunteer-sign-up-form/volunteer-sign-up-form.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

enum SelectedForm {
  VolunteerForm = 0,
  AdminForm = 1,
}

@Component({
  selector: 'app-sign-up-page',
  template: `
  <h1>Sign Up</h1>
  <mat-tab-group mat-stretch-tabs (selectedTabChange)="tabChanged()">
    <mat-tab label="Volunteer">
      <app-volunteer-sign-up-form></app-volunteer-sign-up-form>
    </mat-tab>
    <mat-tab label="School Administrator">
      <app-admin-sign-up-form></app-admin-sign-up-form>
    </mat-tab>
  </mat-tab-group>
  <button mat-raised-button color="primary" class="d-block w-100 mt-3" (click)="signUpClicked()">Sign Up</button>
  `,
})
export class SignUpPageComponent {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup
  @ViewChild(AdminSignUpFormComponent) adminForm: AdminSignUpFormComponent
  @ViewChild(VolunteerSignUpFormComponent) volunteerForm: VolunteerSignUpFormComponent

  constructor(private _snackbar: MatSnackBar, private _router: Router) {}

  tabChanged() {
    this.volunteerForm.form.reset()
    this.adminForm.form.reset()
  }

  signUpClicked() {
    const result = this.tabGroup.selectedIndex === SelectedForm.AdminForm
      ? this.adminForm.submitHandler()
      : this.volunteerForm.submitHandler()

    if (result) (result as Observable<any>).subscribe(
      () => {
        this._router.navigate(['/auth/login'])
        this._snackbar.open(
          'Account has been successfully created', 'OK',
          { duration: 2000 }
        )
      }
    )
  }
}
