import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import * as Highcharts from 'highcharts';
import * as _ from 'underscore';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})

export class CurrencyDetailsComponent implements OnInit {
  convertedCurrenciesGrid : any = [];
  isHiddenMoreDetailsBtn : boolean = true;
  isDisabledFromDropDown : boolean = true;
  selectedFromVal: string = 'EUR';
  selectedToVal: string = 'USD';
  selectedAmtToFrmDataArr: any = {};
  constructor(private commonService: CommonService) { }
  subscriptions: Subscription = new Subscription();
  toDropDownEventEnabled: boolean = true;
  chartSeriesData : any = [];
  showHighchart : boolean = false;
  config : any ;
  ngOnInit(): void {
    
    this.subscriptions.add(
      this.commonService.getSelectedAmtToFrmDataArr.subscribe(data=>{
        this.selectedAmtToFrmDataArr =  data ? data : {};

      })
     
    )
  }

  chartDataEventFun(data: any){
      this.chartSeriesData = data;
      this.showHighchart = true;
 this.config = {
  chart: { type: 'spline', height: 250 },
  
  title: { text: 'Currency Change', },
  xAxis: { type: 'datetime' },
  series : this.chartSeriesData
 
}
     
  }

  highcharts = Highcharts;

}
