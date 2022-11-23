import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '@app/interfaces/User.interface';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private authListenerSubs: Subscription;
  logoPath = '/assets/school_help_logo.png'
  currentUser = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(user => {
      this.currentUser = user;
    })
  }

  get isLoggedIn() {
    return this.currentUser != null;
  }

  ngOnInit(): void {

  }

  get isAdminUser() {
    return this.isLoggedIn && this.currentUser.type === UserType.SchoolAdmin
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
