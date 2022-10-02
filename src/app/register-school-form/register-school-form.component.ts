import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

import type { FormStruct } from 'src/utils/ts-utils';
import type { CreateSchool } from '../interfaces/School.interface';
import { RRangeLength } from 'src/utils/form-utils';

@Component({
  selector: 'app-register-school-form',
  templateUrl: './register-school-form.component.html',
  styleUrls: ['./register-school-form.component.scss']
})
export class RegisterSchoolFormComponent {
  form: FormStruct<{school: CreateSchool}>

  constructor(private userService: UserService, fb: NonNullableFormBuilder) {
    // this.form = fb.group({
    //   school: fb.group({
    //     name:     [ '', RRangeLength(3, 32, 'School Name') ],
    //     address: fb.group({
    //       street: [ '', RRangeLength(6, 255, 'Street') ],
    //       state:  [ '', RRangeLength(3, 32, 'State') ],
    //       city:   [ '', RRangeLength(3, 32, 'City') ],
    //     }),
    //   })
    // })
  }

  get school() {
    return this.form.controls.school.controls
  }

  get schoolAddress() {
    return this.school.address.controls
  }

  submitHandler() {
    this.form.markAsTouched()
  }
}
