import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { AppError } from 'src/app/shared/errors/app-error';
import { BadInput } from 'src/app/shared/errors/bad-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  form: FormGroup;
  logging:boolean = false;

  loginError:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    fb: FormBuilder,
  ) { 
    this.form = fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(1024),
      ]),
    }, {
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  signIn() {

    this.logging = true;
    this.authService.login(this.form.value)
      .subscribe(result => {
        if (result){
          this.logging = false;
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/'])
        }
        else
          this.invalidLogin = true;
      },
      (error: AppError) => {
        if (error instanceof BadInput){
          this.invalidLogin = true;
          this.logging = false;
          this.loginError = error.message;
        }
        else throw error;
      });
  }

}
