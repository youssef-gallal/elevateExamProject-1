import { Component } from '@angular/core';
import { AuthIntroComponent } from "../components/auth-intro/auth-intro.component";
import { AuthNavComponent } from "../components/auth-nav/auth-nav.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AuthFooterrComponent } from "../components/auth-footer/auth-footerr.component";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNavComponent, RouterModule, AuthIntroComponent, AuthFooterrComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
