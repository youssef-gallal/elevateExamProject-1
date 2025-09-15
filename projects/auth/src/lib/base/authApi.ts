import { Observable } from "rxjs";
import { AuthResponse, ForgetResponse, ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, ResetResponse, VerifyCodeRequest, verifyCodeResponse } from "../interface/interfaces";

export abstract class AuthApi {
    abstract login(data: LoginRequest): Observable<AuthResponse>;
    abstract register(data: RegisterRequest): Observable<AuthResponse>;
    abstract forgetpassword(data: ForgotPasswordRequest): Observable<ForgetResponse>;
    abstract verifycode(data: VerifyCodeRequest): Observable<verifyCodeResponse>
    abstract resetpassword(data: ResetPasswordRequest): Observable<ResetResponse>
}