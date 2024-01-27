import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class AuthModule {}
