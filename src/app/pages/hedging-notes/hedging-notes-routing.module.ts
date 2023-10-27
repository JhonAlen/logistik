import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HedgingNotesComponent } from './hedging-notes/hedging-notes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hedging-notes',
        component: HedgingNotesComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HedgingNotesRoutingModule { }
