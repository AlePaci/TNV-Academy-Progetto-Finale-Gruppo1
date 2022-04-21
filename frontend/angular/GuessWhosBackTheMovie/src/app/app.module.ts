import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessWhosBackTheMovieComponent } from './appComponents/guess-whos-back-the-movie/guess-whos-back-the-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessWhosBackTheMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
