import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { isAdmin, UserLogin } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';
import { Required } from 'src/utils/form-utils';
import { FormStruct } from 'src/utils/ts-utils';

@Component({
  selector: 'app-login-form',
  template: `
    <style></style>
    <form [formGroup]="form">
      <mat-form-field gdArea="schoolName" appearance="outline" color="primary">
        <mat-label>Username</mat-label>
        <input matInput [formControl]="username">
        <mat-error validation-error [control]="username"></mat-error>
      </mat-form-field>
      <mat-form-field gdArea="schoolName" appearance="outline" color="primary">
        <mat-label>Username</mat-label>
        <input matInput [formControl]="password">
        <mat-error validation-error [control]="password"></mat-error>
      </mat-form-field>
    </form>
  `,
})
export class LoginFormComponent {
  form: FormStruct<UserLogin>

  constructor(private userService: UserService, fb: NonNullableFormBuilder) {
    this.form = fb.group({
      username: ['', Required('username')],
      password: ['', Required('password')],
    })
  }

  get username() {
    return this.form.controls.username
  }

  get password() {
    return this.form.controls.password
  }

  submitHandler() {
    const { username, password } = this.form.value
    const user = this.userService.login(username, password)
    if (isAdmin(user)) {
      // navigate user to admin dashboard
    } else {
      // navigate user to volunteer dashboard
    }
  }
}
