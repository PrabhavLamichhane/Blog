import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CustomValidators } from './validators/custom-validators';
import { SharedModule } from './../shared/shared.module';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,

    SharedModule
  ],
  providers:[
    CustomValidators,
    AuthService
  ]
})
export class AuthModule { }
