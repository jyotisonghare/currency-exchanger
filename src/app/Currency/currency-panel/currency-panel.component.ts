import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common/common.service';
import { CurrencyApiserviceService } from '../currency-apiservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-currency-panel',
  templateUrl: './currency-panel.component.html',
  styleUrls: ['./currency-panel.component.scss']
})
export class CurrencyPanelComponent implements OnInit {
  currencyArr: any = [];
  currencyForm: FormGroup;
  fromToCurrencyForOneUnit: string = '';
  public filteredCurrencyListLeft: any = [];
  public filteredCurrencyListRight: any = [];
  convertedAmount: string = '';
  convertedCurrenciesGrid: any = [];
  col_number: number = 6;
  selectedTo: string = 'USD';
  selectedFrom: string = 'EUR';


  @Input() isHiddenMoreDetailsBtn: boolean = false;
  @Input() isDisabledFromDropDown = false;
  @Input() selectedFromVal: string = '';
  @Input() selectedToVal: string = '';
  @Input() selectedAmtToFrmData: any;
  @Input() toDropDownEventEnabled: boolean = false;
  @Output()
  convertedValuesArr: EventEmitter<number> = new EventEmitter<number>();
  @Output() chartData: EventEmitter<any> = new EventEmitter<any>();


  constructor(private router: Router,
    private fb: FormBuilder,
    private currencyApiserviceService: CurrencyApiserviceService,
    private commonService: CommonService, private activeRoute: ActivatedRoute) {
    this.getCurrency();

    this.currencyForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^([0-9]+)$')]],
      currencyUnitLeft: [this.selectedFrom, Validators.required],
      currencyUnitRight: [this.selectedTo, Validators.required],
    })

  }

  ngOnInit(): void {
    this.col_number = this.isHiddenMoreDetailsBtn ? 12 : 6;
    let amount = this.activeRoute.snapshot.params['amount'];
    let selectedAmtToFrmData = JSON.stringify(this.selectedAmtToFrmData) === '{}'
    this.currencyForm.get('amount')?.patchValue(amount)
    this.fromToCurrencyForOneUnit = !selectedAmtToFrmData ? this.selectedAmtToFrmData.convertedMsgOfOneUnit : '';
    this.convertedAmount = !selectedAmtToFrmData ? this.selectedAmtToFrmData.convertedAmountMsg : '';
    this.getHichartData();
  }

  onAmountKeyUp(amount: any) {
    this.commonService.setAmountVal(amount);
  }

  changeCurrencyLeft(val: any) {
    this.commonService.setFromCurrencyVal(val);
  }

  changeCurrencyRight(val: string) {
    this.commonService.setToCurrencyVal(val);
    if (this.toDropDownEventEnabled) {
      this.getHichartData();

    }

  }

  getDaysBetweenDates = function (startDate: any, endDate: any) {
    var now = moment(startDate).clone();
    var dates = [];

    while (now.isSameOrBefore(endDate)) {
      const dateStr = now.format('YYYY-MM-DD');
      const endOfMonth = moment(dateStr).clone().endOf('month').format('YYYY-MM-DD');
      dates.push(endOfMonth);
      now.add(1, 'months');
    }
    return dates;
  };

  
  getHichartData() {
    let end_date = moment().format("YYYY-MM-DD");
    let start_date = (moment(end_date).subtract(1, 'years')).format("YYYY-MM-DD");
    // let symbols = this.selectedFromVal + "," + toVal;
    let fromCurrencyVal = '';
    let toCurrencyVal = '';
    this.commonService.getToCurrencyObserver.subscribe(data=>{
      toCurrencyVal =  data ? data : 'USD';
    })
    this.commonService.getFromCurrencyObserver.subscribe(data=>{
      fromCurrencyVal =  data ? data : 'EUR';
    })
    let symbols = this.selectedFromVal + "," + toCurrencyVal;

    this.currencyApiserviceService.getHistoricalData(start_date, end_date, this.selectedFromVal, symbols).subscribe((data) => {
      if (data.success) {
        var dateList = this.getDaysBetweenDates(start_date, end_date);
        const allowed = dateList;
        const rates: any = data.rates;
        const filtered = Object.keys(rates)
          .filter(key => allowed.includes(key))
          .reduce((obj: any, key: any) => {
            obj[key] = rates[key];
            return obj;
          }, {});

        console.log(filtered);
        let arr1: any = [];
        let arr2: any = [];


        Object.entries(filtered).forEach(([key, value]) => {
          var d = new Date(key);
          let utcTime = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
          console.log(key + ' - ' + value) // key - value
          let dataVal: any = value;
          // console.log("dataVal[fromCurrencyVal]##", dataVal[fromCurrencyVal])
          // console.log("dataVal[toCurrencyVal]##", dataVal[toCurrencyVal])
          arr1.push([utcTime, dataVal[fromCurrencyVal]])
          arr2.push([utcTime, dataVal[toCurrencyVal]])
        })
        // console.log("arr1 ###", arr1)
        // console.log("arr2 ###", arr2)
        let seriesFinalData = [
          {
            name: fromCurrencyVal,

            data: arr1
          },
          {
            name: toCurrencyVal,

            data: arr2
          }]

        this.chartData.emit(seriesFinalData);
      }
    })
  }


  getCurrency() {
    this.currencyApiserviceService.getCurrencyList().subscribe((data) => {
      if (data.success) {
        const output = Object.entries(data.symbols).map(([key, value]) => ({
          key,
          value
        }));
        this.currencyArr = output;
        this.filteredCurrencyListLeft = output.slice();
        this.filteredCurrencyListRight = output.slice();

      }
    })
  }

  exchangeCurrency() {
    // console.log("####", this.currencyForm.value);
    let fromVal = this.getLeftCurrencyCtrl?.value;
    let toVal = this.getRightCurrencyCtrl?.value;
    let amount = this.getAmountCtrl?.value;
    this.commonService.setFromCurrencyVal(toVal);
    this.commonService.setToCurrencyVal(fromVal);
    this.commonService.setAmountVal(amount);
    this.currencyForm.get('currencyUnitLeft')?.patchValue(toVal);
    this.currencyForm.get('currencyUnitRight')?.patchValue(fromVal);
    // console.log("#### After exchange ###", this.currencyForm.value);

  }

  get getLeftCurrencyCtrl() {
    return this.currencyForm.get('currencyUnitLeft');
  }
  get getRightCurrencyCtrl() {
    return this.currencyForm.get('currencyUnitRight');
  }
  get getAmountCtrl() {
    return this.currencyForm.get('amount');
  }


  convertCurrency() {
    let fromVal = this.getLeftCurrencyCtrl?.value;
    let toVal = this.getRightCurrencyCtrl?.value;
    let amount = this.getAmountCtrl?.value;

    this.currencyApiserviceService.convertCurrency(fromVal, toVal, amount).subscribe((data) => {
      if (data.success) {

        this.convertedAmount = data.result + ` ${data.query.to}`;
        let convertedToVal = (data.result / amount);
        let convertedAmountMsg = `${amount} ${fromVal} = ${this.convertedAmount} `
        this.fromToCurrencyForOneUnit = `1 ${fromVal} = ${convertedToVal} ${toVal}`
        if (this.convertedCurrenciesGrid.length == 9) {
          this.convertedCurrenciesGrid.shift();
        }
        this.convertedCurrenciesGrid.push({
          'convertedAmountMsg': convertedAmountMsg,
          'convertedMsgOfOneUnit': this.fromToCurrencyForOneUnit,
          'to': toVal,
          'from': fromVal,
          'amount': amount

        })
        this.convertedValuesArr.emit(this.convertedCurrenciesGrid);
      }
    })
  }

  moreDetails() {

    this.router.navigate(['/app/currency/currency-details', this.getLeftCurrencyCtrl?.value, this.getRightCurrencyCtrl?.value, this.getAmountCtrl?.value])

  }
}

