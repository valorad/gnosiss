import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';


const gnosissRouting: Routes = [
    {
        path:'',
        pathMatch: 'full',
        redirectTo: '/index', 
    },
    {
        path:'index',
        component: IndexComponent
    },
    {
        path:'**',
        component: Http404Component
    }
];

export const gnosissRoutes = RouterModule.forRoot(gnosissRouting, { useHash: true });