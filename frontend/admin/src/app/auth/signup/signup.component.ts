import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordValidators } from './../validators/password-validators';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  invalidSignUp:boolean = false;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.form = fb.group({
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        // CategoryNameValidators.cannotContainSpace
      ]),
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
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(1024),
      ])
    }, {
      validator: PasswordValidators.passwordsShouldMatch
    });


  }

  ngOnInit(): void {
  }

  get email() {
    return this.form.get('email');
  }

  get displayName() {
    return this.form.get('displayName');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  submit(){
    const { ['passwordConfirm']: omitted, ...formData } = this.form.value;
    console.log(formData);
    this.authService.signUp(formData)
      .subscribe(result => {
        if (result){
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/'])
        }
        else
          this.invalidSignUp = true;
      })
  }




}
