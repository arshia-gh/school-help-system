import { Component } from '@angular/core';
import { RequestService } from './services/request.service';
import { SchoolService } from './services/school.service';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public request: RequestService, public school: SchoolService, public user: UserService) {

  }
  title = 'SchoolHELP';
}
