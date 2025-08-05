export class AuthEndPoint {
    static login = '/api/v1/auth/signin'
    static register = '/api/v1/auth/signup'
    static changePassword = '/api/v1/auth/changePassword'
    static deleteAcount = '/api/v1/auth/deleteMe'
    static editProfile = '/api/v1/auth/editProfile'
    static logout = '/api/v1/auth/logout'
    static getloggedUserInfo = '/api/v1/auth/profileData'
    static forgotPassword = '/api/v1/auth/forgotPassword'
    static verifyCode = '/api/v1/auth/verifyResetCode'
    static resetPassword = '/api/v1/auth/resetPassword'
}