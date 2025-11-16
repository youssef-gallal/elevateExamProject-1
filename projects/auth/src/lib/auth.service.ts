import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthEndPoint';
import { AuthAdaptorService } from './adaptor/auth-adaptor.service';
import { Base_Url } from './base-url';
import { AdaptedAuthResponse, AdaptedForgetResponse, AdaptedVerifyResponse, AuthResponse, ForgotPasswordRequest, LoginRequest, logoutResponse, MessageResponse, RegisterRequest, ResetPasswordRequest, ResetResponse, VerifyCodeRequest, verifyCodeResponse } from './interface/interfaces';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  _httpClient = inject(HttpClient)
  _base_Url = inject(Base_Url)
  _authadaptorService = inject(AuthAdaptorService)
  
  logout(): Observable<logoutResponse> {
    return this._httpClient.get<logoutResponse>(this._base_Url + AuthEndPoint.logout).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }),
      catchError(err => of(err)));
  }
  login(data: LoginRequest): Observable<AdaptedAuthResponse> {
    return this._httpClient.post<AuthResponse>(this._base_Url + AuthEndPoint.login, data)
      .pipe(
        map((res: AuthResponse) => this._authadaptorService.adapt(res)),
        catchError(err => of(err)));
  }
  register(data: RegisterRequest): Observable<AdaptedAuthResponse> {
    return this._httpClient.post<AuthResponse>(this._base_Url + AuthEndPoint.register, data)
      .pipe(
        map((res: AuthResponse) => this._authadaptorService.adapt(res)),
        catchError(err => of(err)));
  }
  forgetPassword(data: ForgotPasswordRequest): Observable<AdaptedForgetResponse> {
    return this._httpClient.post<MessageResponse>(this._base_Url + AuthEndPoint.forgotPassword, data)
      .pipe(
        map((res: MessageResponse) => this._authadaptorService.forget(res)),
        catchError(err => of(err)));
  }
  verifyCode(data: VerifyCodeRequest): Observable<AdaptedVerifyResponse> {
    return this._httpClient.post<verifyCodeResponse>(this._base_Url + AuthEndPoint.verifyCode, data)
      .pipe(
        map((res: verifyCodeResponse) => this._authadaptorService.verify(res)),
        catchError(err => of(err)));
  }
  resetPassword(data: ResetPasswordRequest): Observable<AdaptedVerifyResponse> {
    return this._httpClient.put<ResetResponse>(this._base_Url + AuthEndPoint.resetPassword, data)
      .pipe(
        map((res: ResetResponse) => this._authadaptorService.Reset(res)),
        catchError(err => of(err)));
  }
}


