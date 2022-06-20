import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  toCurrencyVal: string = '';
  fromCurrencyVal: string = '';
  amountVal: number = 1;
  subscriptions: Subscription = new Subscription();
  constructor(private commonService : CommonService, private activeRoute: ActivatedRoute) { }

  isValue: number = 1;

  

  ngOnInit(): void {
    let toVal = this.activeRoute.snapshot.params['to'];
    let fromVal = this.activeRoute.snapshot.params['from'];
    
    this.subscriptions.add(
      this.commonService.getToCurrencyObserver.subscribe(data=>{
        this.toCurrencyVal =  data ? data : 'USD';
      })
     
    )
    
    this.subscriptions.add(
      this.commonService.getFromCurrencyObserver.subscribe(data=>{
        this.fromCurrencyVal = data ? data : 'EUR';
      })
     
    )
    this.subscriptions.add(
      this.commonService.getCurrencyAmountObserver.subscribe(data=>{
        this.amountVal = data ? data : 1;
      })
     
    )
  }
  toggle(num : number) { this.isValue = num; }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
