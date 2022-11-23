import { CompleteSchoolAdmin, CreateUser, SchoolAdmin, UserType, } from "@app/interfaces/User.interface";
import type { FormStruct } from "src/utils/ts-utils";

import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { REmail, Required, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@app/services/auth.service";
import { first, Observable, tap } from "rxjs";
import { UserService } from "@app/services/user.service";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})

export class ManageProfileComponent implements OnInit {
  form: FormStruct<{ admin: CreateUser<SchoolAdmin> }>
  currentAdmin$: Observable<CompleteSchoolAdmin>

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _snackbar: MatSnackBar,
    fb: NonNullableFormBuilder
  ) {
    this.form = fb.group({
      admin: fb.group({
        username: ['', RRangeLength(6, 32, 'Username')],
        password: ['', RRangeLength(6, 32, 'Password')],
        email: ['', REmail],
        fullname: ['', RRangeLength(6, 32, 'Full Name')],
        phoneNo: ['', [Required('Phone Number')]],
        position: ['', [Required('Position')]],
        staffId: ['', [Required('staffId')]],
      })
    })
    this.currentAdmin$ = _authService.admin();
  }

  get admin() {
    return this.form.controls.admin.controls
  }

  updateProfile() {
    if (this.form.invalid) return touchFormFields(this.form)

    const { admin } = this.form.getRawValue()
    this._userService.updateAdmin(admin);
    this._snackbar.open('Profile Updated Successfully', 'OK');
  }

  ngOnInit(): void {
    this._authService.user$.pipe(
      tap(user => {
        if (user.type === UserType.SchoolAdmin) return;
        this._router.navigate(['/'])
        this._snackbar.open(
          'Redirected to landing page because only Admin can manage profile', 'OK'
        );
      })
    )
  }
}
