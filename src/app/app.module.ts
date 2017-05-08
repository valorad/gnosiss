import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

/* ngx-bootstrap modules s */
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
/* ngx-bootstrap modules e */

// fix ng2-file-upload not known property issue
import { FileUploadModule } from "ng2-file-upload/file-upload/file-upload.module";

/* ngx-translate modules s */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/* ngx-translate modules e */

import { GnosissMdModule } from './_gnosiss-util-modules/gnosiss-md.module';


import { gnosissRoutes } from './gnosiss.route';

import { DataService } from './_gnosiss_services/data.service';
import { ImgQueryService } from './_gnosiss_services/img-query.service'; 
import { ThumbnailService } from './_gnosiss_services/thumbnail.service'; 


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { ImgListComponent } from './img-list/img-list.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';
import { VaDatePickerComponent } from './_gnosiss-util-components/va-date-picker/va-date-picker.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';

const angularModules = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
];

const ngxBSModules = [
  DatepickerModule.forRoot()
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component,
    ImgListComponent,
    ImgDetailComponent,
    VaDatePickerComponent,
    ImgUploadComponent
  ],
  imports: [
    angularModules,
    GnosissMdModule,
    ngxBSModules,
    FileUploadModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
        }
    }),

    gnosissRoutes
  ],
  providers: [
    DataService,
    ImgQueryService,
    ThumbnailService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
