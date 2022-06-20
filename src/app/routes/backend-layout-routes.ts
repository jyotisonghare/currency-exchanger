  import { Routes } from '@angular/router';

export const BACKEND_LAYOUT: Routes = [

    {
        path: 'currency',
        loadChildren: () => import('../Currency/currency.module').then(m => m.CurrencyModule)
    },
    
]