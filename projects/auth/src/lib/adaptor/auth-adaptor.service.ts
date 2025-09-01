import { Injectable } from '@angular/core';
import { Adaptor, Forget } from '../interface/adapt';
import { AdaptedAuthResponse, AdaptedForgetResponse, AdaptedVerifyResponse, AuthResponse, ForgetResponse, ResetResponse, verifyCodeResponse } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthAdaptorService implements Adaptor, Forget {

  constructor() { }
  forget(data: ForgetResponse): AdaptedForgetResponse {
    return {
      message: data.message,
      info: data.info
    };
  }

  verify(data: verifyCodeResponse): AdaptedVerifyResponse {
    return {
      message: data.status
    };
  }

  Reset(data: ResetResponse): AdaptedVerifyResponse {
    return {
      message: data.message
    };
  }


  adapt(data: AuthResponse): AdaptedAuthResponse {
    return {
      message: data.message,
      token: data.token,
      email: data.user.email,
    };
  }


}

