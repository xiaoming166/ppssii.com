import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NoteComponent } from './note/note.component';
import {NzLayoutModule} from "ng-zorro-antd";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ShareModule} from "../../common/share.module";
import {MatTreeModule} from "@angular/material/tree";
import { Note2Component } from './note2/note2.component';


@NgModule({
  declarations: [NoteComponent, Note2Component],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzLayoutModule,
    DragDropModule,
    MatTreeModule,
    ShareModule,
  ]
})
export class HomeModule { }
