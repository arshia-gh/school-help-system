import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { isAdmin, UserLogin, BaseUser } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';
import { Required, touchFormFields } from 'src/utils/form-utils';
import { FormStruct } from 'src/utils/ts-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-form',
  template: `
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
      <button mat-raised-button class="w-100 mt-2" color="primary" (click)="submitHandler()">
        Login
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  form: FormStruct<UserLogin>

  constructor(
    fb: NonNullableFormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.form = fb.group({
      username: ['', Required('username')],
      password: ['', Required('password', false)],
    })
  }

  get username() {
    return this.form.controls.username
  }

  get password() {
    return this.form.controls.password
  }

  submitHandler() {
    if (this.form.invalid) return touchFormFields(this.form)

    const { username, password } = this.form.value

    this._authService.login(username, password)
      .subscribe(user => {
        if (user) {
          this._snackBar.open(`Successfully login as ${user['fullname']}`, null, {
            duration: 3000,
          })
          this._router.navigate(['/requests']);
        }
        else {
          this._snackBar.open('Incorrect username or password', null, {
            duration: 3000,
          })
          this.form.reset()
        }
      })
  }
}
