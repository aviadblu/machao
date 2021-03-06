import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';

import {BooksService} from './books.service';
import { RestTableComponent } from './rest-table/rest-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    RestTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
