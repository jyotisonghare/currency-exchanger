import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeforeLoginRoutingModule } from './before-login-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    BeforeLoginRoutingModule
  ]
})
export class BeforeLoginModule { }
