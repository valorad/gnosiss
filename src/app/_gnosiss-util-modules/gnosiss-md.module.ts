import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdCardModule,
  MdInputModule,
  MdSelectModule,
  MdTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule
  ]
})
export class GnosissMdModule { }
