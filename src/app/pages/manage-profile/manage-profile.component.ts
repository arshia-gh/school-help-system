import { CreateUser, SchoolAdmin, UserType, } from "@app/interfaces/User.interface";
import type { CreateSchool } from "@app/interfaces/School.interface";
import type { FormStruct } from "src/utils/ts-utils";

import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { REmail, Required, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { UserService } from "@app/services/user.service";
import { SchoolService } from "@app/services/school.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})

export class ManageProfileComponent implements OnInit {
  form: FormStruct<{ admin: CreateUser<SchoolAdmin> }>
  currentAdmin = this._userService.currentUser as SchoolAdmin;

  constructor(
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
  }

  get admin() {
    return this.form.controls.admin.controls
  }

  updateProfile() {
    if (this.form.invalid) return touchFormFields(this.form)

    const { admin } = this.form.getRawValue()
    const updatedAdmin: SchoolAdmin = {
      school: this.currentAdmin.school,
      type: this.currentAdmin.type,
      id: this.currentAdmin.id,
      ...admin
    }
    this._userService.updateAdmin(updatedAdmin);
    this._snackbar.open('Profile Updated Successfully', 'OK');
  }

  ngOnInit(): void {
    if (this._userService.currentUser?.type != UserType.SchoolAdmin) {
      // this._router.navigate(['/'])
      this._snackbar.open('Redirected to landing page because only Admin can manage profile', 'OK');
    }
    else {
      const fc = this.form.controls.admin.controls;
      fc.username.disable();
      fc.username.setValue(this.currentAdmin.username);
      fc.password.setValue(this.currentAdmin.password);
      fc.email.setValue(this.currentAdmin.email);
      fc.fullname.setValue(this.currentAdmin.fullname);
      fc.phoneNo.setValue(this.currentAdmin.phoneNo);
      fc.staffId.setValue(this.currentAdmin.staffId);
      fc.position.setValue(this.currentAdmin.position);
    }
  }
}
