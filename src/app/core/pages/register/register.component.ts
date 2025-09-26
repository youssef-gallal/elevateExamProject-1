import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from "primeng/button";
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from 'auth';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorComponent } from "../form-error/form-error.component";
import { passwordMatchValidator } from '../../utils/password-match.validator';


@Component({
  selector: 'app-register',
  imports: [ToastModule, RouterLink, FloatLabel, RouterModule, RouterLink, InputNumberModule, PasswordModule, FormsModule, ReactiveFormsModule, InputTextModule, IftaLabelModule, Button, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],

})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  private destroy$ = new Subject<void>();
  constructor(private messageService: MessageService, private router: Router,
    private authService: AuthService,) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.initForm()
  }
  initForm() {
    this.registerForm = new FormGroup({
      Email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]),
      Fname: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      Lname: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      rePassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]),
      phone: new FormControl("", [
        Validators.required,
      ])

    },
      { validators: passwordMatchValidator('password', 'rePassword') });;
  }


  get formControls() {
    return this.registerForm.controls;
  }


  submit() {
    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly'
      });
      return;
    }
    const model = {
      email: this.registerForm.value.Email,
      username: this.registerForm.value.username,
      firstName: this.registerForm.value.Fname,
      lastName: this.registerForm.value.Lname,
      password: this.registerForm.value.password,
      rePassword: this.registerForm.value.rePassword,
      phone: this.registerForm.value.phone
    }
    console.log(model);

    this.authService.register(model)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.token) {
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'login successful', life: 1500 });
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
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


