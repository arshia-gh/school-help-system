import { CompleteSchoolAdmin, CreateUser, SchoolAdmin, UserType, } from "@app/interfaces/User.interface";
import type { FormStruct } from "src/utils/ts-utils";

import { Component, OnDestroy, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { RangeLength, REmail, Required, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@app/services/auth.service";
import { Subscription } from "rxjs";
import { UserService } from "@app/services/user.service";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})

export class ManageProfileComponent implements OnInit, OnDestroy {
  form: FormStruct<{ admin: CreateUser<SchoolAdmin> }>
  currentAdminSub: Subscription

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
        password: ['', RangeLength(6, 32, 'password')],
        email: ['', REmail],
        fullname: ['', RRangeLength(6, 32, 'Full Name')],
        phoneNo: ['', [Required('Phone Number')]],
        position: ['', [Required('Position')]],
        staffId: ['', [Required('staffId')]],
      })
    })
  }

  get admin() {
    return this.form.controls.admin.controls
  }

  updateProfile() {
    if (this.form.invalid) return touchFormFields(this.form)

    const { admin } = this.form.getRawValue()
    this._userService.updateAdmin(admin).subscribe(
      () => {
        this._snackbar.open('Profile Updated Successfully', 'OK'),
        this._authService.refetchUser()
      }
    );
  }

  ngOnInit(): void {
    this.admin.username.disable()

    this.currentAdminSub = this._authService.admin().subscribe(admin => {
      if (admin == null) {
        this._router.navigate(['/'])
        this._snackbar.open(
          'Redirected to landing page because only Admin can manage profile', 'OK'
        );
      } else {
        this.admin.username.setValue(admin.username)
        this.admin.email.setValue(admin.email)
        this.admin.fullname.setValue(admin.fullname)
        this.admin.phoneNo.setValue(admin.phoneNo)
        this.admin.position.setValue(admin.position)
        this.admin.staffId.setValue(admin.staffId)
      }
    })
  }

  ngOnDestroy() {
    this.currentAdminSub.unsubscribe()
  }
}
