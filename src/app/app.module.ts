import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ValidationErrorComponent } from './ui/validation-error/validation-error.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { ViewRequestsComponent, RequestDetailDialog } from './pages/view-requests/view-requests.component';

import { ViewRequestDetailDialog } from './pages/view-school-requests-page/view-request-details-dialog/view-request-dialog.component';

import { LoginFormComponent } from './forms/login-form.component';
import { DashboardLayoutComponent } from '@app/layouts/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

import { CustomTitleStrategy } from '@app/custom-title.strategy';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component'
import { VolunteerSignUpFormComponent } from './forms/volunteer-sign-up-form/volunteer-sign-up-form.component';
import { AdminSignUpFormComponent } from './forms/admin-sign-up-form/admin-sign-up-form.component';
import { LoginPageComponent } from './pages/login-page.component';
import { TrimTransformDirective } from './directives/trim-transform.directive';
import { ViewSchoolRequestPageComponent } from './pages/view-school-requests-page/view-school-request-page.component';
import { CreateRequestDialog } from './pages/view-school-requests-page/create-request-dialog/create-request-dialog.component';
import { CreateRequestFormComponent } from './forms/create-request-form/create-request-form.component';
import { ViewOffersPageComponent } from './pages/view-offers-page/view-offers-page.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: ViewSchoolRequestPageComponent,
        title: 'Dashboard'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'signup', component: SignUpPageComponent, title: 'SignUp'},
      { path: 'login', component: LoginPageComponent, title: 'Login' },
    ]
  },
  { path: 'dashboard', component: DashboardLayoutComponent},
  { path: 'requests', component: ViewRequestsComponent },
  { path: 'offers/:requestId', component: ViewOffersPageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ViewRequestsComponent,

    // ui components
    ValidationErrorComponent,
    HeaderComponent,
    RequestDetailDialog,
    ViewRequestDetailDialog,
    CreateRequestDialog,

    // layout components
    DashboardLayoutComponent,
    AuthLayoutComponent,

    // page components
    LandingPageComponent,
    SignUpPageComponent,
    LoginPageComponent,
    ViewSchoolRequestPageComponent,


    // form components
    VolunteerSignUpFormComponent,
    AdminSignUpFormComponent,
    LoginFormComponent,
    CreateRequestFormComponent,

    // directives
    TrimTransformDirective,
      ViewOffersPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
