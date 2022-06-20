import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyRoutingModule } from './currency-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMainComponent } from './currency-main/currency-main.component';
import { CurrencyPanelComponent } from './currency-panel/currency-panel.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { HighchartsChartModule } from "highcharts-angular";
import { HighChartComponent } from './chart/chart.component';
@NgModule({
  declarations: [
    CurrencyMainComponent,
    CurrencyPanelComponent,
    CurrencyDetailsComponent,
    HighChartComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    MaterialModuleModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ]
})
export class CurrencyModule { }
