import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { AuthService } from 'auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorComponent } from "../form-error/form-error.component";
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, FloatLabel, CommonModule, PasswordModule, FormsModule,
    ReactiveFormsModule, InputTextModule, IftaLabelModule, ToastModule, FormErrorComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup | any
  private destroy$ = new Subject<void>();
  constructor(private messageService: MessageService, private router: Router,
    private authService: AuthService,) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)])
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }

  handleSubmitForm() {
    console.log(this.loginForm.value);
  }
  submit() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly'
      });
      return;
    }
    const model = {
      email: this.loginForm.value.Email,
      password: this.loginForm.value.password
    };

    this.authService.login(model)
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          if (res.token) {
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'login successful', life: 1500 });
            localStorage.setItem('token', res.token);
            setTimeout(() => {
              this.router.navigate(['/Dashboard']);
            }, 1000);
          }
          else {
            this.messageService.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: 'Invalid credentials'
            });
          }
        }
      });
  }
}