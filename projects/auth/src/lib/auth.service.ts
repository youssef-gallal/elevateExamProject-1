import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthEndPoint';
import { AuthAdaptorService } from './adaptor/auth-adaptor.service';
import { Base_Url } from './base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _httpClient = inject(HttpClient)
  _base_Url = inject(Base_Url)
  _authadaptorService = inject(AuthAdaptorService)

  login(data: any): Observable<any> {
    return this._httpClient.post(this._base_Url + AuthEndPoint.login, data)
      .pipe(map(res => this._authadaptorService.adapt(res)),
        catchError(err => of(err))

      )
  }
  register(data: any): Observable<any> {
    return this._httpClient.post(this._base_Url + AuthEndPoint.register, data)
      .pipe(map(res => this._authadaptorService.adapt(res)),
        catchError(err => of(err))
      )
  }
  forgetpaswword(data: any): Observable<any> {
    return this._httpClient.post(this._base_Url + AuthEndPoint.forgotPassword, data)
      .pipe(map(res => this._authadaptorService.forget(res)),
        catchError(err => of(err))
      )
  }
  verifycode(data: any): Observable<any> {
    return this._httpClient.post(this._base_Url + AuthEndPoint.verifyCode, data)
      .pipe(map(res => this._authadaptorService.forget(res)),
        catchError(err => of(err))
      )
  }
  resetpassword(data: any): Observable<any> {
    return this._httpClient.post(this._base_Url + AuthEndPoint.resetPassword, data)
      .pipe(map(res => this._authadaptorService.forget(res)),
        catchError(err => of(err))
      )
  }





}


