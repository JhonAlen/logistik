import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuanceOfNotesComponent } from './issuance-of-notes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'issuance-of-notes',
        component: IssuanceOfNotesComponent,
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfNotesRoutingModule { }
