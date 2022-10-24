import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule,
    DataViewModule,
    MessageModule,
    ConfirmDialogModule
  ],
  exports: [
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    ChipsModule,
    ButtonModule,
    DataViewModule,
    MessageModule,
    ConfirmDialogModule
  ]
})
export class PrimeNgModule { }
