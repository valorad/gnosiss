import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { ImgListComponent } from './img-list/img-list.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';


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
        path:'list',
        component: ImgListComponent
    },
    {
        path:'search',
        pathMatch: 'full',
        redirectTo: '/img/q?p=chengdu,f=2017-1-1,t=2017-5-5', 
    },
    {
        path:'img/q',
        component: ImgListComponent
    },
    {
        path:'img/name/:name',
        component: ImgDetailComponent
    },
    {
        path:'**',
        component: Http404Component
    }
];

export const gnosissRoutes = RouterModule.forRoot(gnosissRouting, { useHash: true });