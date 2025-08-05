import { Component } from '@angular/core';
import { AuthIntroComponent } from "../components/auth-intro/auth-intro.component";
import { LoginComponent } from "../../pages/login/login.component";
import { AuthNavComponent } from "../components/auth-nav/auth-nav.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { ForgetPasswordComponent } from "../../pages/forgetpassword/forgetpassword.component";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNavComponent, RouterModule, AuthIntroComponent, LoginComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
