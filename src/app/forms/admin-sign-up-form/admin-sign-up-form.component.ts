import type { CreateUser, SchoolAdmin, } from "@app/interfaces/User.interface";
import type { CreateSchool } from "@app/interfaces/School.interface";
import type { FormStruct } from "src/utils/ts-utils";

import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { REmail, Required, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { UserService } from "@app/services/user.service";
import { SchoolService } from "@app/services/school.service";
import { Router } from "@angular/router";
import { switchMap, tap } from "rxjs";

@Component({
  selector: 'app-admin-sign-up-form',
  templateUrl: './admin-sign-up-form.component.html',
  styleUrls: ['./admin-sign-up-form.component.scss']
})
export class AdminSignUpFormComponent {
  form: FormStruct<{school: CreateSchool, admin: CreateUser<SchoolAdmin>}>

  constructor(
    private _schoolService: SchoolService,
    private _userService: UserService,
    private _router: Router,
    fb: NonNullableFormBuilder
  ) {
    this.form = fb.group({
      school: fb.group({
        name:     ['', RRangeLength(3, 32, 'School Name') ],
        address: fb.group({
          street: [ '', RRangeLength(6, 255, 'Street') ],
          state:  [ '', RRangeLength(3, 32, 'State') ],
          city:   [ '', RRangeLength(3, 32, 'City') ],
        }),
      }),
      admin: fb.group({
        username: ['', RRangeLength(6, 32, 'Username')],
        password: ['', RRangeLength(6, 32, 'Password')],
        email:    ['', REmail],
        fullname: ['', RRangeLength(6, 32, 'Username')],
        phoneNo:  ['', [Required('Phone Number')]],
        position: ['', [Required('Position')]],
        staffId:  ['', [Required('staffId')]],
      })
    })
  }

  get school() {
    return this.form.controls.school.controls
  }

  get schoolAddress() {
    return this.school.address.controls
  }

  get admin() {
    return this.form.controls.admin.controls
  }

  submitHandler() {
    if (this.form.invalid) return touchFormFields(this.form)

    const { admin, school } = this.form.getRawValue()

    return this._schoolService.addSchool(school).pipe(
      switchMap(school => this._userService.addSchoolAdmin(
          admin, school.id
        )
      )
    )
  }
}
