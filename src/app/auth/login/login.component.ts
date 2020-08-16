import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.email, Validators.required]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  }
  );

  emailErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    else {
      return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
    }
  }

  passwordErrorMessage() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'You must enter a value';
    }
    else {
      return this.loginForm.get('password').hasError('minLength') ? '' : 'password is too short';
    }
  }


  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.removeItem('userData');
  }

  onSubmit() {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        responseData => {
          this.router.navigate(['./employees'])
          localStorage.setItem('userData', JSON.stringify(responseData));
        },
        errorMessage => {
          this.snackBar.open(errorMessage, 'close', {
            duration: 2000,
          })
        }
      )
  }

}
