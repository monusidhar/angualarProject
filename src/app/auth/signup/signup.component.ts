import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup= new FormGroup({
    'email': new FormControl('',[Validators.email,Validators.required]),
    'password': new FormControl('', [
      Validators.required, 
      Validators.minLength(8)
]),
    }
  );


  emailErrorMessage(){
    if (this.signupForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    else{
      return this.signupForm.get('email').hasError('email') ? 'Not a valid email' : '';
    }
  }

  passwordErrorMessage(){
    if (this.signupForm.get('password').hasError('required')) {
      return 'You must enter a value';
    }
    else{
      return this.signupForm.get('password').hasError('minLength') ? '' : 'password is too short';
    }
  }

  constructor(private authService: AuthService,private router: Router,
     private snackBar: MatSnackBar){}

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value.email, this.signupForm.value.password);
      this.authService.signup(this.signupForm.value.email, this.signupForm.value.password).subscribe(
        responseData =>{
          this.router.navigate(['/employees']);
          localStorage.setItem('userData', JSON.stringify(responseData));
        },
        errorMessage =>{
          this.snackBar.open(errorMessage, 'close',{
            duration: 3000,
          })
        }
      )
    }  
  }

}
