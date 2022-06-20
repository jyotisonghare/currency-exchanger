import { Injectable } from '@angular/core';
import * as highcharts from 'highcharts';
@Injectable()
export class HighChartService {
  redraw(el : any, cfg : any) {
    highcharts.chart(el, cfg);
  }
}