import { AdaptedAuthResponse, AdaptedForgetResponse, AdaptedVerifyResponse, AuthResponse, ForgetResponse, ResetResponse, verifyCodeResponse } from "./interfaces";

export interface Adaptor {
    adapt(data: AuthResponse): AdaptedAuthResponse;
}

export interface Forget {
    forget(data: ForgetResponse): AdaptedForgetResponse;
}
export interface reset {
    reset(data: ResetResponse): AdaptedVerifyResponse;
}
export interface verify {
    verify(data: verifyCodeResponse): AdaptedVerifyResponse;
}


