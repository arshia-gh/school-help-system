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
import { LoginFormComponent } from './forms/login-form.component';
import { DashboardLayoutComponent } from '@app/layouts/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

import { CustomTitleStrategy } from '@app/custom-title.strategy';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component'
import { VolunteerSignUpFormComponent } from './forms/volunteer-sign-up-form/volunteer-sign-up-form.component';
import { AdminSignUpFormComponent } from './forms/admin-sign-up-form/admin-sign-up-form.component';
import { LoginPageComponent } from './pages/login-page.component';
import { TrimTransformDirective } from './directives/trim-transform.directive';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
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
  { path: 'profile', component: ManageProfileComponent },
]

@NgModule({
  declarations: [
    AppComponent,

    // ui components
    ValidationErrorComponent,
    HeaderComponent,
    ViewRequestsComponent,
    RequestDetailDialog,

    // layout components
    DashboardLayoutComponent,
    AuthLayoutComponent,

    // page components
    LandingPageComponent,
    SignUpPageComponent,
    LoginPageComponent,


    // form components
    VolunteerSignUpFormComponent,
    AdminSignUpFormComponent,
    LoginFormComponent,

    // directives
    TrimTransformDirective,
      ManageProfileComponent,
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
