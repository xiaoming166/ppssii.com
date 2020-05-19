import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NoteComponent} from "./note/note.component";
import {Note2Component} from "./note2/note2.component";


const routes: Routes = [
  {
    path: 'note',
    component: NoteComponent,
  },
  {
    path: 'note2',
    component: Note2Component,
  },
  {
    path: '',
    redirectTo: 'note',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
