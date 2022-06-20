
import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../before-login/before-login.module').then(m => m.BeforeLoginModule)
    },
  
]