import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormComponent } from 'src/app/forms/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;

  constructor() { }

  login() {
    this.loginForm.submitHandler();
  }
  ngOnInit(): void {
  }

}
