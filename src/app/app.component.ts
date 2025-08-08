import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthIntroComponent } from "./core/layout/components/auth-intro/auth-intro.component";
import { AuthLayoutComponent } from "./core/layout/auth-layout/auth-layout.component";
import { LoginComponent } from "./core/pages/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam-1';
}
