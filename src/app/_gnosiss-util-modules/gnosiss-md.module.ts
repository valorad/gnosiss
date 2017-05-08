import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdCardModule,
  MdInputModule,
  MdSelectModule,
  MdTabsModule,
  MdProgressBarModule
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
    MdTabsModule,
    MdProgressBarModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule,
    MdProgressBarModule
  ]
})
export class GnosissMdModule { }
