import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: 'film-detail', component: FilmDetailComponent}, 
  {path: '', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
