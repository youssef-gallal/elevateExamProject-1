import { Component } from '@angular/core';
import { AuthIntroComponent } from "../components/auth-intro/auth-intro.component";
import { AuthNavComponent } from "../components/auth-nav/auth-nav.component";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNavComponent, RouterModule, AuthIntroComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
