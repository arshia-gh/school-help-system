import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { isAdmin, UserLogin } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';
import { Required } from 'src/utils/form-utils';
import { FormStruct } from 'src/utils/ts-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  template: `
    <style></style>
    <form [formGroup]="form" fxLayout="column">
      <mat-form-field gdArea="schoolName" appearance="outline" color="primary">
        <mat-label>Username</mat-label>
        <input matInput [formControl]="username">
        <mat-error validation-error [control]="username"></mat-error>
      </mat-form-field>
      <mat-form-field gdArea="schoolName" appearance="outline" color="primary">
        <mat-label>Password</mat-label>
        <input matInput [formControl]="password" type="password">
        <mat-error validation-error [control]="password"></mat-error>
      </mat-form-field>
    </form>
  `,
})
export class LoginFormComponent {
  form: FormStruct<UserLogin>

  constructor(private userService: UserService, fb: NonNullableFormBuilder, private router: Router, private _snackBar: MatSnackBar) {
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

    if (user != null) {
      this.router.navigate((isAdmin(user) ? ['/dashboard'] : ['/requests']))
    }
    else {
      this._snackBar.open('Incorrect username or password', null, {
        duration: 3000,
      });
    }
  }
}
