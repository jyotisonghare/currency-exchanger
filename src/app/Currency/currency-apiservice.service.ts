import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiserviceService {
  moduleUrl: string | undefined;
  myHeaders:any = new Headers();
  constructor(private dataService: DataService,
    private http: HttpClient) { }

  getCurrencyList(): Observable<any> {
 
    // this.myHeaders.append("apikey", "DbgfzSeL0uug0iZiAArUj4b4R7TrHJfO");

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: this.myHeaders
      };

    let url = 'https://api.apilayer.com/fixer/symbols';
    return this.http.get<any>(url);
  }

  convertCurrency( from: any,to: any, amount: number ): Observable<any> {
    let url = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`
    return this.http.get<any>(url);

  }

  getHistoricalData(start_date: any, end_date: any, base: string, symbols : string){
    let url = `https://api.apilayer.com/fixer/timeseries?start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${symbols}`
    return this.http.get<any>(url);
  }
}
