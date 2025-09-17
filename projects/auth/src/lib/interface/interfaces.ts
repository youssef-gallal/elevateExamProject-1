export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyCodeRequest {
    code: string;
}

export interface ResetPasswordRequest {
    email: string;
    newPassword: string;
}
// =========================================================================================
export interface MessageResponse {
    message: string;
    info: string;
}

export interface AdaptedAuthResponse {
    message: string;
    token: string;
    email: string;
}


export interface AdaptedVerifyResponse {
    message: string;
}
// =========================================================================================

export interface User {
    email: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface ForgetResponse {
    message: string;
    info: string;
}
export interface verifyCodeResponse {
    status: string;
}
export interface ResetResponse {
    message: string;
}


export interface AdaptedForgetResponse {
    message: string;
    info: string;
}

