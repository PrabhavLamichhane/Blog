import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { SharedModule } from './shared/shared.module';
import { CustomValidators } from './auth/validators/custom-validators';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    AppRoutingModule,
    SharedModule,
    BlogModule,
    AuthModule
  ],
  providers: [
    CustomValidators,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
