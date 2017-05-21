import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './_gnosiss_services/auth-guard.service'; 

import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { ImgListComponent } from './img-list/img-list.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';

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
        path:'upload',
        component: ImgUploadComponent,
        // authed users can nav to this page
        canActivate: [AuthGuardService]
    },
    {
        path:'search',
        pathMatch: 'full',
        redirectTo: '/img/q', 
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

export const gnosissRoutes = RouterModule.forRoot(gnosissRouting, { useHash: false });