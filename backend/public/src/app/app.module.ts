import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {
  NzCardModule,
  NzDropDownModule,
  NzEmptyModule,
  NzGridModule,
  NzIconModule, NzInputModule,
  NzLayoutModule, NzListModule,
  NzModalModule,
  NzTreeModule
} from 'ng-zorro-antd';
import {IconDefinition} from '@ant-design/icons-angular';

import {
  AccountBookFill, AlertFill, SnippetsOutline,
  FileOutline, FolderOutline, FolderOpenOutline,
  AlertOutline
} from '@ant-design/icons-angular/icons';
import {DragDropModule} from '@angular/cdk/drag-drop';

const icons: IconDefinition[] = [AccountBookFill, SnippetsOutline, FileOutline, FolderOutline, FolderOpenOutline,
  AlertOutline, AlertFill];

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    AppRoutingModule,
    NzTreeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzDropDownModule,
    NzIconModule.forRoot(icons),
    NzCardModule,
    NzLayoutModule,
    NzModalModule,
    NzEmptyModule,
    NzInputModule,
    NzListModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
