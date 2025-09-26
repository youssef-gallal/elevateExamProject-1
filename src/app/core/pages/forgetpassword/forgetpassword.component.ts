import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonComponent } from "../../shared/button/button.component";
import { passwordMatchValidator } from '../../utils/password-match.validator';
import { FormErrorComponent } from "../form-error/form-error.component";

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    ButtonComponent,
    FormErrorComponent
  ],
  providers: [MessageService],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetPasswordComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _msg = inject(MessageService);

  private destroy$ = new Subject<void>();

  step: 'email' | 'verify' | 'reset' = 'email';

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifyForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  resetForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  },
    { validators: passwordMatchValidator('password', 'rePassword') }
  );
  get formControls() {
    return this.resetForm.controls;
  }

  submitEmail() {
    if (this.emailForm.invalid) return;

    const payload = { email: this.emailForm.value.email! };

    this._authService.forgetPassword(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._msg.add({ severity: 'success', summary: 'Email Sent', detail: 'Verification code sent' });
          this.step = 'verify';
        },
        error: (err) => {
          this._msg.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Failed to send email' });
        }
      });
  }

  submitVerify() {
    if (this.verifyForm.invalid) return;

    const verifyData: any = { resetCode: this.verifyForm.value.code! };

    this._authService.verifyCode(verifyData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._msg.add({ severity: 'success', summary: 'Verified', detail: 'Code verified successfully' });
          this.step = 'reset';
        },
        error: (err) => {
          this._msg.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Invalid code' });
        }
      });
  }

  submitReset() {
    if (this.resetForm.invalid || this.emailForm.invalid) return;

    const payload = {
      email: this.emailForm.value.email!,
      newPassword: this.resetForm.value.password!,
    };

    this._authService.resetPassword(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._msg.add({ severity: 'success', summary: 'Password Reset', detail: 'Password updated successfully' });
          this._router.navigate(['/login']);
        },
        error: (err) => {
          this._msg.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Reset failed' });
        }
      });
  }
  resendCode() {
    if (this.emailForm.invalid) return;

    const payload = { email: this.emailForm.value.email! };

    this._authService.forgetPassword(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._msg.add({ severity: 'success', summary: 'Resent', detail: 'Verification code resent to your email' });
        },
        error: (err) => {
          this._msg.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Failed to resend code' });
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

