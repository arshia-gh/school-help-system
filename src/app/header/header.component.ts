import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserType } from '@app/interfaces/User.interface';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  private authListenerSubs: Subscription;
  logoPath = '/assets/school_help_logo.png'
  currentUser: User;

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
    this.authListenerSubs = this.authService.getUser()
      .subscribe(user => {
        this.currentUser = user;
      })
  }

  get isLoggedIn() {
    return this.currentUser != null;
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }

  get isAdminUser() {
    return this.isLoggedIn && this.currentUser.type === UserType.SchoolAdmin
  }

  logout() {
    this.authService.logout();
    this.snackbar.open('Logout Successful ', null, {
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['info-snackbar']
    })
    if (this.router.url !== '/requests') {
      this.router.navigate(['/'])
    }
  }
}
