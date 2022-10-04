import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterSchoolFormComponent } from './register-school-form/register-school-form.component'

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list'
import { ReactiveFormsModule } from '@angular/forms';
import { AdminFormComponent } from './register-school-form/admin-form/admin-form.component';
import { SchoolFormComponent } from './register-school-form/school-form/school-form.component';
import { ValidationErrorComponent } from './ui/validation-error/validation-error.component';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewRequestsComponent, RequestDetailDialog } from './pages/view-requests/view-requests.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'requests', component: ViewRequestsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterSchoolFormComponent,
    AdminFormComponent,
    SchoolFormComponent,
    ValidationErrorComponent,
    LandingPageComponent,
    HeaderComponent,
    ViewRequestsComponent,
    RequestDetailDialog,
    SignUpComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MaterialModule,
    FormsModule,
    MatNativeDateModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
