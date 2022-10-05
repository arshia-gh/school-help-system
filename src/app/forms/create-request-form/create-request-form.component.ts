import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { MatTabGroup } from "@angular/material/tabs";
import { CreateRequest, Resource, ResourceType, StudentLevel, Tutorial } from "@app/interfaces/Request.interface";
import { SchoolAdmin } from "@app/interfaces/User.interface";
import { RequestService } from "@app/services/request.service";
import { UserService } from "@app/services/user.service";
import { Required, RRange, RRangeLength, touchFormFields } from "src/utils/form-utils";
import { FormStruct } from "src/utils/ts-utils";
import * as dayjs from 'dayjs'

enum SelectedForm {
  TutorialForm = 0,
  ResourceForm = 1,
}

type TutorialFormFields = Omit<
  CreateRequest<Tutorial>, 'studentLevel' | 'proposedDateTime'
> & { studentLevel: string, proposedDate: Date, proposedTime: Date }

@Component({
  selector: 'app-create-request-form',
  template: `
  <mat-tab-group mat-stretch-tabs (selectedIndexChange)="formSelected()">
    <mat-tab label="Tutorial">
      <form [formGroup]="tutorialForm" class="mt-4">
        <div
          gdAreas="proposedDate proposedTime  | numOfStudent studentLevel | description description"
          gdGap="0.75rem" gdRows="auto auto"
        >
          <mat-form-field appearance="outline" gdArea="proposedDate">
            <mat-label>Proposed Date</mat-label>
            <input matInput [formControl]="tutorial.proposedDate" [matDatepicker]="picker">
            <mat-error validation-error [control]="tutorial.proposedDate"></mat-error>
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <mat-form-field gdArea="proposedTime" appearance="outline" color="primary">
            <mat-label>Proposed Time</mat-label>
            <input type="time" matInput [formControl]="tutorial.proposedTime">
            <mat-error validation-error [control]="tutorial.proposedTime"></mat-error>
          </mat-form-field>
          <mat-form-field gdArea="numOfStudent" appearance="outline" color="primary">
            <mat-label>Number of students</mat-label>
            <input matInput [formControl]="tutorial.numOfStudent">
            <mat-error validation-error [control]="tutorial.numOfStudent"></mat-error>
          </mat-form-field>
          <mat-form-field gdArea="description" appearance="outline" color="primary">
            <mat-label>Description</mat-label>
            <textarea matInput [formControl]="tutorial.description"></textarea>
            <mat-error validation-error [control]="tutorial.description"></mat-error>
          </mat-form-field>
          <mat-form-field gdArea="studentLevel" appearance="outline">
            <mat-label>Student Level</mat-label>
            <mat-select [formControl]="tutorial.studentLevel">
              <mat-option value="Advanced">Advanced</mat-option>
              <mat-option value="Intermediate">Intermediate</mat-option>
              <mat-option value="Beginner" selected>Beginner</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </form>
    </mat-tab>
    <mat-tab label="Resource">
      <form [formGroup]="resourceForm" class="mt-4">
        <div
          gdAreas="resourceType numRequired | description description"
          gdGap="0.75rem" gdRows="auto auto"
        >
          <mat-form-field gdArea="resourceType" appearance="outline">
            <mat-label>Resource Type</mat-label>
            <mat-select [formControl]="resource.resourceType">
              <mat-option value="MobileDevice">Mobile Device</mat-option>
              <mat-option value="PersonalComputer">Personal Computer</mat-option>
              <mat-option value="NetworkingEquipment">Networking Equipment</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field gdArea="numRequired" appearance="outline" color="primary">
            <mat-label>Number Required</mat-label>
            <input matInput [formControl]="resource.numRequired">
            <mat-error validation-error [control]="resource.numRequired"></mat-error>
          </mat-form-field>
          <mat-form-field gdArea="description" appearance="outline" color="primary">
            <mat-label>Description</mat-label>
            <textarea matInput [formControl]="resource.description"></textarea>
            <mat-error validation-error [control]="resource.description"></mat-error>
          </mat-form-field>
        </div>
      </form>
    </mat-tab>
  </mat-tab-group>
  <button mat-raised-button color="primary" class="d-block w-100 mt-3" (click)="requestSubmitted()">
    Submit Request
  </button>
  `
})
export class CreateRequestFormComponent {
  @ViewChild(MatTabGroup) private _tabGroup: MatTabGroup
  @Output() formSubmitted = new EventEmitter()

  tutorialForm: FormStruct<TutorialFormFields>
  resourceForm: FormStruct<Omit<CreateRequest<Resource>, 'resourceType'> & { resourceType: string}>
  user: SchoolAdmin

  constructor(private _requestService: RequestService, private _userService: UserService, fb: NonNullableFormBuilder) {
    this.tutorialForm = fb.group({
      description: ['', RRangeLength(6, 255, 'Description')],
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

    const parsedTime = dayjs(proposedTime)
    const proposedDateTime = dayjs(proposedDate)
      .set('hours', parsedTime.hour())
      .set('minutes', parsedTime.minute())
      .toDate()

    this._requestService.addTutorial(
      {
        ...tutorial,
        proposedDateTime,
        studentLevel: StudentLevel[tutorial.studentLevel]
      },
      this.user.school
    )

    console.log(this._requestService);

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
