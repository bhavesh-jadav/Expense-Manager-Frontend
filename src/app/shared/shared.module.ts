import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSelectModule, MdInputModule } from '@angular/material';
import { MdIconModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdTooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  declarations: [],
  exports: [
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    NgbModule
  ]
})
export class SharedModule { }
