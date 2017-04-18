import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    DatepickerModule.forRoot()
  ],
  exports: [
    DatepickerModule
  ]
})
export class GnosissNgxBsModule { }