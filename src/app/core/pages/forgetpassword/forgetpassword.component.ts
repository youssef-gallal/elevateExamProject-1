import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from 'auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
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
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetPasswordComponent {
  _AuthService = inject(AuthService)

  currentStep: 'email' | 'verify' | 'reset' = 'email';
  forgetForm: FormGroup;

  constructor(private messageService: MessageService, private router: Router) {
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      verifyCode: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });
  }
  isStepValid(): boolean {
    switch (this.currentStep) {
      case 'email':
        return this.forgetForm.get('email')?.valid ?? false;

      case 'verify':
        return this.forgetForm.get('verifyCode')?.valid ?? false;

      case 'reset':
        return (
          this.forgetForm.get('email')?.valid &&
          this.forgetForm.get('newPassword')?.valid
        ) ?? false;

      default:
        return false;
    }
  }

  resend() {
    const model = {
      email: this.forgetForm.value.email,
    };

    this._AuthService.forgetPassword(model).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Verification code resent to your email'
        });
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message || 'Failed to resend code'
        });
      }
    });
  }

  submit() {
    switch (this.currentStep) {
      case 'email':
        const model = {
          email: this.forgetForm.value.email,
        }
        this._AuthService.forgetPassword(model).subscribe({
          next: (res: any) => {
            console.log(res);

            this.messageService.add({
              severity: 'success',
              summary: 'Email Sent',
              detail: 'Verification code has been sent to your email'
            });
            this.currentStep = 'verify';
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.error?.message || 'Failed to send verification email'
            });
          }
        });
        break;

      case 'verify':
        const data: any = {
          resetCode: this.forgetForm.value.verifyCode,
        }
        this._AuthService.verifyCode(data).subscribe({
          next: (res: any) => {
            console.log(res);

            this.messageService.add({
              severity: 'success',
              summary: 'Verified',
              detail: 'Code verified successfully'
            });
            this.currentStep = 'reset';
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Invalid Code',
              detail: err?.error?.message || 'Verification failed'
            });
          }
        });
        break;

      case 'reset':
        const reset: any = {
          email: this.forgetForm.value.email,
          newPassword: this.forgetForm.value.newPassword,
        }
        this._AuthService.resetPassword(reset).subscribe({
          next: (res: any) => {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Password Reset',
              detail: 'Your password has been successfully reset'
            });
            this.router.navigateByUrl('/login')
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.error?.message || 'Failed to reset password'
            });
          }
        });
        break;
    }
  }

}