import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { CurrencyMainComponent } from './currency-main/currency-main.component';


const routes: Routes = [
  {
    path : '',
    component : CurrencyMainComponent
  },
  {
    path : 'currency-details/:from/:to/:amount',
    component : CurrencyDetailsComponent
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
