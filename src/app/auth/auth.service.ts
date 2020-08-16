import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import {environment} from '../../environments/environment'
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }

@Injectable({
    providedIn:'root'
})
export class AuthService{

    constructor(private http:HttpClient, private router: Router){}

    signup(email: string, password: string) {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.api_key,
          {
            email: email,
            password: password,
            returnSecureToken: true
          }
        )
        .pipe(
          catchError(this.handleError)
        );
    }

    login(email: string, password: string) {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.api_key,
          {
            email: email,
            password: password,
            returnSecureToken: true
          }
        )
        .pipe(
          catchError(this.handleError)
        );
    }


    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.';
          break;
      }
      return throwError(errorMessage);
    }
    
    // autoLogin(){
    //   let user= JSON.parse(localStorage.getItem('userData'));
    //   if(!user){
    //     return;
    //   }
    //   if(localStorage.getItem("userToken")){
    //     console.log('i am login')
    //     this.router.navigate(['./dashboard'])
    //   }
    //   else{
    //     console.log('i am failed')
    //     this.router.navigate(['./login'])
    //   }

    // }
}