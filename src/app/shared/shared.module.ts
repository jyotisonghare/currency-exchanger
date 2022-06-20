import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModuleModule } from '../material-module/material-module.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SharedRoutingModule } from './shared-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
  MainHeaderComponent,
  SpinnerComponent
  ],
  exports:[
    MainHeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModuleModule
  ]
})
export class SharedModule { }
