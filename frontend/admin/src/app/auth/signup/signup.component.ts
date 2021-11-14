import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from 'src/app/shared/errors/app-error';
import { BadInput } from 'src/app/shared/errors/bad-input';

import { CustomValidators } from '../validators/custom-validators';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  invalidSignUp: boolean = false;
  creating: boolean = false;

  signUpError: string;

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
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
        asyncValidators: [CustomValidators.shouldBeUnique(this.authService)]
      },
      ),
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
      validator: CustomValidators.passwordsShouldMatch
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

  submit() {
    const { ['passwordConfirm']: omitted, ...formData } = this.form.value;
    this.creating = true;
    this.authService.signUp(formData)
      .subscribe(result => {
        if (result) {
          this.creating = false;
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/'])

        }
        else
          this.invalidSignUp = true;
      },
        (error: AppError) => {
          if (error instanceof BadInput) {
            this.invalidSignUp = true;
            this.creating = false;
            this.signUpError = error.message;
          }
          else throw error;
        }
      )
  }




}
