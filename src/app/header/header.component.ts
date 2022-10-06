import { Component, OnInit } from '@angular/core';
import { UserType } from '@app/interfaces/User.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoPath = '/assets/school_help_logo.png'
  currentUser = this.userService.currentUser;
  isLoggedIn = false;

  constructor(private userService: UserService) {
    this.isLoggedIn = this.currentUser != null;

    this.userService.authEvent.subscribe((e) => {
      this.isLoggedIn = e.type === 'login';
      this.currentUser = e.data;
    })
  }

  ngOnInit(): void {
  }

  get isAdminUser() {
    return this.isLoggedIn && this.currentUser.type === UserType.SchoolAdmin
  }

  logout() {
    this.userService.logout();
  }
}
