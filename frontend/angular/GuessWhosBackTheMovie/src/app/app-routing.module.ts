import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { GiocoComponent } from './components/gioco/gioco.component';

import { MovieListComponent } from './components/movie-list/movie-list.component';



const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: "home", component: HomeComponent},

  {path: 'film-detail/:movieId', component: FilmDetailComponent},
  {path: 'gioco', component: GiocoComponent},

  {path: 'gioco/:movieId/:points', component: SaveComponent},
  {path: 'film', component: MovieListComponent},  
  {path: '', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
