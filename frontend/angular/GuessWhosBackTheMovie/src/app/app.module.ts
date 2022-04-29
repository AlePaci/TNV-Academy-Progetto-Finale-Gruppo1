//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { GiocoComponent } from './components/gioco/gioco.component';
import { SaveComponent } from './components/save/save.component';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';











@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FilmDetailComponent,
    NavbarComponent,
    HomeComponent,
    GiocoComponent,
    SaveComponent,
   MovieListComponent
  ],






  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
