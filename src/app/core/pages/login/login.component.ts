import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../register/register.component";
import { AuthService } from 'auth';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FloatLabel, CommonModule, PasswordModule, FormsModule, ReactiveFormsModule, InputTextModule, IftaLabelModule, Button, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  constructor(private router: Router, private AuthService: AuthService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = new FormGroup({
      Email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    })
  }
  submit() {
    const model = {
      email: this.loginForm.value.Email,
      password: this.loginForm.value.password
    }


    this.AuthService.login(model).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token)
    });
    this.router.navigate(['/Dashboard'])
  }
}