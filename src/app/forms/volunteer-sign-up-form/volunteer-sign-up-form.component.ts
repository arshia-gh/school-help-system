import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { CreateUser, Volunteer } from "@app/interfaces/User.interface";
import { REmail, Required, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { FormStruct } from "src/utils/ts-utils";
import { formatDate } from "@angular/common";
import { UserService } from "@app/services/user.service";

@Component({
  selector: 'app-volunteer-sign-up-form',
  template: `
  <form [formGroup]="form" (ngSubmit)="submitHandler()">
    <div
      class="mt-4"
      gdAreas="
        username password |
        email email |
        fullname phone | occupation dob
      "
      gdGap="0 1.2rem"
    >
      <mat-form-field appearance="outline" gdArea="username">
        <mat-label>Username</mat-label>
        <input matInput [formControl]="volunteer.username">
        <mat-error validation-error [control]="volunteer.username"></mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline" gdArea="password">
        <mat-label>Password</mat-label>
        <input matInput [formControl]="volunteer.password" type="password">
        <mat-error validation-error [control]="volunteer.password"></mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" gdArea="email">
        <mat-label>Email</mat-label>
        <input matInput [formControl]="volunteer.email" type="email">
        <mat-error validation-error [control]="volunteer.email"></mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" gdArea="fullname">
        <mat-label>Full Name</mat-label>
        <input matInput [formControl]="volunteer.fullname">
        <mat-error validation-error [control]="volunteer.fullname"></mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" gdArea="phone">
        <mat-label>Phone Number</mat-label>
        <input matInput [formControl]="volunteer.phoneNo">
        <mat-error validation-error [control]="volunteer.phoneNo"></mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" gdArea="occupation">
        <mat-label>Occupation</mat-label>
        <input matInput [formControl]="volunteer.occupation">
        <mat-error validation-error [control]="volunteer.occupation"></mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" gdArea="dob">
        <mat-label>Date of birth</mat-label>
        <input matInput [formControl]="volunteer.dob" [matDatepicker]="picker" (dateChange)="dateChangeHandler" [max]='today'>
        <mat-error validation-error [control]="volunteer.dob"></mat-error>
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>
  </form>
  `
})
export class VolunteerSignUpFormComponent {
  form: FormStruct<CreateUser<Volunteer>>
  today = new Date();

  constructor(
    private _userService: UserService,
    fb: NonNullableFormBuilder
  ) {
    this.form = fb.group({
      username: ['', RRangeLength(6, 32, 'Username')],
      password: ['', RRangeLength(6, 32, 'Password')],
      email: ['', REmail],
      fullname: ['', RRangeLength(6, 32, 'Username')],
      phoneNo: ['', [Required('Phone Number')]],
      occupation: ['', [Required('Occupation')]],
      dob: ['01/01/2000', [Required('Date of birth')]],
    })
  }

  get volunteer() {
    return this.form.controls
  }

  dateChangeHandler(date: Date) {
    const stringDate = formatDate(date, 'mm/DD/yyyy', 'en')
    this.volunteer.dob.setValue(stringDate)
  }

  submitHandler() {
    if (this.form.invalid) return touchFormFields(this.form)

    const volunteer = this.form.getRawValue()
    this._userService.addVolunteer(volunteer)
  }
}
