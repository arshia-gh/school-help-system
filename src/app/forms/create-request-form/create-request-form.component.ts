import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { MatTabGroup } from "@angular/material/tabs";
import { CreateRequest, Resource, ResourceType, StudentLevel, Tutorial } from "@app/interfaces/Request.interface";
import { CompleteSchoolAdmin } from "@app/interfaces/User.interface";
import { RequestService } from "@app/services/request.service";
import { Required, RRange, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { FormStruct } from "src/utils/ts-utils";
import { DayJsService } from "@app/services/dayjs.service";
import { AuthService } from "@app/services/auth.service";
import { Observable, switchMap } from "rxjs";

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
  admin$: Observable<CompleteSchoolAdmin>

  constructor(
    private _requestService: RequestService,
    private _authService: AuthService,
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

    this.admin$ = this._authService.admin()
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

    const parsedTime = this._dayjs.parse(proposedTime, 'HH:mm')
    const proposedDateTime = this._dayjs.parse(proposedDate)
      .set('hour', parsedTime.get('hour'))
      .set('minute', parsedTime.get('minute'))
      .toDate()

    this.admin$.pipe(
      switchMap(admin =>
        this._requestService.addTutorial(
          {
            ...tutorial,
            proposedDateTime,
            studentLevel: StudentLevel[tutorial.studentLevel]
          },
          admin.school.id
        )
      )
    ).subscribe(() => this.formSubmitted.emit())
  }

  resourceSubmitHandler() {
    if (this.resourceForm.invalid) return touchFormFields(this.resourceForm)

    const resource = this.resourceForm.getRawValue()
    this.admin$.pipe(
      switchMap(admin =>
        this._requestService.addResource(
          {
            ...resource,
            resourceType: StudentLevel[resource.resourceType]
          },
          admin.school.id
        )
      ),
    ).subscribe(() => this.formSubmitted.emit())
  }

  get tutorial() {
    return this.tutorialForm.controls
  }

  get resource() {
    return this.resourceForm.controls
  }
}
