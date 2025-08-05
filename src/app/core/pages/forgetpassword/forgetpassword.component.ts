import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from 'auth';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetPasswordComponent {
  _AuthService = inject(AuthService)

  currentStep: 'email' | 'verify' | 'reset' = 'email';
  forgetForm: FormGroup;

  constructor() {
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      verifyCode: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });
  }

  submit() {
    switch (this.currentStep) {
      case 'email':
        const model = {
          email: this.forgetForm.value.email,
        }
        this._AuthService.forgetpaswword(model).subscribe({
          next: (res) => console.log(res),
        });

        this.currentStep = 'verify';
        break;
      case 'verify':
        const data = {
          resetCode: this.forgetForm.value.verifyCode,
        }
        this._AuthService.verifycode(data).subscribe({
          next: (res) => console.log(res),
        });
        this.currentStep = 'reset';
        break;
      case 'reset':
        const reset = {
          email: this.forgetForm.value.email,
          newPassword: this.forgetForm.value.newPassword,
        }
        this._AuthService.resetpassword(reset).subscribe({
          next: (res) => console.log(res),
        });
        break;
    }
  }
}