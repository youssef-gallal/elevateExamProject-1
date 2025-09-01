import { Observable } from "rxjs";

export abstract class AuthApi {
    abstract login(data: any): Observable<any>;
    abstract register(data: any): Observable<any>;
    abstract forgetpassword(data: any): Observable<any>;
    abstract verifycode(data: any): Observable<any>
    abstract resetpassword(data: any): Observable<any>
}