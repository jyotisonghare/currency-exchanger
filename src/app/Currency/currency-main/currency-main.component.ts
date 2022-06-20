import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common/common.service';
import * as Highcharts from 'highcharts';
import * as _ from 'underscore';

@Component({
  selector: 'app-currency-main',
  templateUrl: './currency-main.component.html',
  styleUrls: ['./currency-main.component.scss']
})
export class CurrencyMainComponent implements OnInit, AfterViewInit {
  currencyArr: any = [];
  fromToCurrencyForOneUnit : string = '';
  public filteredCurrencyListLeft: any = [];
  public filteredCurrencyListRight: any = [];
  convertedAmount: string = '';
  convertedCurrenciesGrid : any = [];
  isHiddenMoreDetailsBtn : boolean = false;
  isDisabledFromDropDown : boolean = false;
  selectedFromVal: string = 'EUR';
  selectedToVal: string = 'USD';
  selectedAmtToFrmDataArr : any = {};
 

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  getConvertedCurrencyArr(val : any){
    this.convertedCurrenciesGrid = val;
   
    let gridLength = this.convertedCurrenciesGrid.length;
    this.selectedAmtToFrmDataArr = gridLength > 0 ? this.convertedCurrenciesGrid[this.convertedCurrenciesGrid.length - 1]: {};
    this.commonService.setSelectedAmtToFrmDataArr(this.selectedAmtToFrmDataArr)
 
  }

  ngAfterViewInit(){
    
  }
  
}
