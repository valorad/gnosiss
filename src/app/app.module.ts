import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GnosissMdModule } from './_gnosiss-util-modules/gnosiss-md.module';
import { GnosissNgxBsModule } from './_gnosiss-util-modules/gnosiss-ngx-bs.module';

import { gnosissRoutes } from './gnosiss.route';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { ImgListComponent } from './img-list/img-list.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component,
    ImgListComponent,
    ImgDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,

    GnosissMdModule,
    GnosissNgxBsModule,

    gnosissRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
