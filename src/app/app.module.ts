import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewRequestsComponent, RequestDetailDialog } from './pages/view-requests/view-requests.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'requests', component: ViewRequestsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    ViewRequestsComponent,
    RequestDetailDialog,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
    MatNativeDateModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
