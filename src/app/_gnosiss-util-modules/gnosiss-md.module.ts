import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdCardModule,
  MdInputModule,
  MdSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule
  ]
})
export class GnosissMdModule { }
