import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout-component',
  template: `
    <style>
      .custom-background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url("../../../assets/abstract_background.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: -1000;
      }
    </style>

    <div class="custom-background"></div>
    <div class="container my-3">
      <router-outlet></router-outlet>
    </div>
  `
})
export class DashboardLayoutComponent {
}
