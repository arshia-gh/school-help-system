import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-default-layout',
  template: `
    <style>
  .bg {
    animation: slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, rgb(130, 225, 82) 50%, rgb(246, 222, 127) 50%);
    bottom: 0;
    left: -50%;
    opacity: .5;
    position: fixed;
    right: -50%;
    top: 0;
    z-index: -1;
  }

  .bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  .bg3 {
    animation-duration: 5s;
  }

  .content {
    background-color: white;
    border-radius: .25em;
    box-shadow: 0 0 .25em rgba(0, 0, 0, .25);
    box-sizing: border-box;
    padding: 8vmin 10vmin;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes slide {
    0% {
      transform: translateX(-25%);
    }

    100% {
      transform: translateX(25%);
    }
  }
  </style>

  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <mat-card class="content">
    <router-outlet></router-outlet>
  </mat-card>
  `,
})
export class AuthLayoutComponent {
}
