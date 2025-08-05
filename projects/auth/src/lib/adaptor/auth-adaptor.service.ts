import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adapt';
import { Forget } from '../interface/forget';

@Injectable({
  providedIn: 'root'
})
export class AuthAdaptorService implements Adaptor, Forget {

  constructor() { }

  adapt(data: any) {
    return {
      message: data.message,
      token: data.token,
      email: data.user.email,
    }
  }
  forget(data: any) {
    return {
      message: data.message,
      info: data.info
    }
  }
}
