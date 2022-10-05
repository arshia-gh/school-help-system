import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { MatTabGroup } from "@angular/material/tabs";
import { CreateRequest, Resource, ResourceType, StudentLevel, Tutorial } from "@app/interfaces/Request.interface";
import { SchoolAdmin } from "@app/interfaces/User.interface";
import { RequestService } from "@app/services/request.service";
import { UserService } from "@app/services/user.service";
import { Required, RRange, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { FormStruct } from "src/utils/ts-utils";
import { DayJsService } from "@app/services/dayjs.service";

enum SelectedForm {
  TutorialForm = 0,
  ResourceForm = 1,
}

type TutorialFormFields = Omit<
  CreateRequest<Tutorial>, 'studentLevel' | 'proposedDateTime'
> & { studentLevel: string, proposedDate: Date, proposedTime: Date }
type ResourceFormFields = Omit<CreateRequest<Resource>, 'resourceType'> & { resourceType: string}

@Component({
  selector: 'app-create-request-form',
  templateUrl: './create-request-form.component.html'
})
export class CreateRequestFormComponent {
  @ViewChild(MatTabGroup) private _tabGroup: MatTabGroup
  @Output() formSubmitted = new EventEmitter()

  tutorialForm: FormStruct<TutorialFormFields>
  resourceForm: FormStruct<ResourceFormFields>
  user: SchoolAdmin

  constructor(
    private _requestService: RequestService,
    private _userService: UserService,
    private _dayjs: DayJsService,
    fb: NonNullableFormBuilder
  ) {
    this.tutorialForm = fb.group({
      description:  ['', RRangeLength(6, 255, 'Description')],
      numOfStudent: [1, RRange(1, 60, 'Number of students')],
      proposedDate: ['', [Required('Tutorial date')]],
      proposedTime: ['', [Required('Tutorial time')]],
      studentLevel: [StudentLevel.Beginner as string, [Required('Student level')]],
    })

    this.resourceForm = fb.group({
      description: ['', RRangeLength(6, 255, 'Description')],
      numRequired: [1, RRange(1, 255, 'Number required')],
      resourceType: [ResourceType.MobileDevice as string, [Required('Resource type')]]
    })

    this.user = this._userService.currentUser as SchoolAdmin
  }

  formSelected() {
    this.tutorialForm.reset()
    this.resourceForm.reset()
  }

  requestSubmitted() {
    return this._tabGroup.selectedIndex === SelectedForm.TutorialForm
      ? this.tutorialSubmitHandler() : this.resourceSubmitHandler()
  }

  tutorialSubmitHandler() {
    if (this.tutorialForm.invalid) return touchFormFields(this.tutorialForm)

    const { proposedDate, proposedTime, ...tutorial } = this.tutorialForm.getRawValue()

    const parsedTime = this._dayjs.parse('09:10', 'HH:mm')
    const proposedDateTime = this._dayjs.parse(proposedDate)
      .set('hour', parsedTime.get('hour'))
      .set('minute', parsedTime.get('minute'))
      .toDate()

    this._requestService.addTutorial(
      {
        ...tutorial,
        proposedDateTime,
        studentLevel: StudentLevel[tutorial.studentLevel]
      },
      this.user.school
    )

    this.formSubmitted.emit()
  }

  resourceSubmitHandler() {
    if (this.resourceForm.invalid) return touchFormFields(this.resourceForm)

    const resource = this.resourceForm.getRawValue()
    this._requestService.addResource(
      {
        ...resource,
        resourceType: StudentLevel[resource.resourceType]
      },
      this.user.school
    )
    this.formSubmitted.emit()
  }

  get tutorial() {
    return this.tutorialForm.controls
  }

  get resource() {
    return this.resourceForm.controls
  }
}
