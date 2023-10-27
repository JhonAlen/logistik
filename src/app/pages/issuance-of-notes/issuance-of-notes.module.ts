import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IssuanceOfNotesRoutingModule } from './issuance-of-notes-routing.module';
import { IssuanceOfNotesComponent } from './issuance-of-notes.component';


@NgModule({
  declarations: [
    IssuanceOfNotesComponent
  ],
  imports: [
    CommonModule,
    IssuanceOfNotesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class IssuanceOfNotesModule { }
