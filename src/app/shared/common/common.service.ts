import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  fromCurrencyVal = new BehaviorSubject<string>('EUR');
  toCurrencyVal =  new BehaviorSubject<string>('USD');
  amount = new BehaviorSubject<number>(1);
  getFromCurrencyObserver = this.fromCurrencyVal.asObservable();
  getToCurrencyObserver = this.toCurrencyVal.asObservable();
  getCurrencyAmountObserver = this.amount.asObservable();
  selectedAmtToFrmDataArr = new BehaviorSubject<any>({});
  getSelectedAmtToFrmDataArr = this.selectedAmtToFrmDataArr.asObservable();
   
  constructor() { }
  
  setFromCurrencyVal(currency: any) {
    this.fromCurrencyVal.next(currency)
  }
  setToCurrencyVal(currency: any) {
    this.toCurrencyVal.next(currency)
  }
  setAmountVal(amount: number) {
    this.amount.next(amount)
  }
  setSelectedAmtToFrmDataArr(data: any) {
    this.selectedAmtToFrmDataArr.next(data)
  }
 


}
