import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { HedgingNotesRoutingModule } from './hedging-notes-routing.module';
import { HedgingNotesComponent } from './hedging-notes/hedging-notes.component';



@NgModule({
  declarations: [
    HedgingNotesComponent
  ],
  imports: [
    CommonModule,
    HedgingNotesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HedgingNotesModule { }
