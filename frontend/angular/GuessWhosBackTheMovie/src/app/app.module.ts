import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { CommentComponent } from './components/child-components/comment/comment.component';
import { RatingsComponent } from './components/child-components/ratings/ratings.component';
import { PosterComponent } from './components/child-components/poster/poster.component';
import { MovieTableComponent } from './components/child-components/movie-table/movie-table.component';
import { CastDetailComponent } from './components/child-components/cast-detail/cast-detail.component';
import { ProductionDetailComponent } from './components/child-components/production-detail/production-detail.component';
import { SinossiComponent } from './components/child-components/sinossi/sinossi.component';
import { RankingComponent } from './components/child-components/ranking/ranking.component';
import { MovieScoreComponent } from './components/child-components/movie-score/movie-score.component';
import { MovieListBodyComponent } from './components/child-components/movie-list-body/movie-list-body.component';
import { SavingFormComponent } from './components/child-components/saving-form/saving-form.component';
import { TimeComponent } from './components/child-components/time/time.component';
import { GameResultComponent } from './components/child-components/game-result/game-result.component';
import { GuessDataComponent } from './components/child-components/guess-data/guess-data.component';
import { UpdateRatingComponent } from './components/child-components/update-rating/update-rating.component';
import { UpdateCommentComponent } from './components/child-components/update-comment/update-comment.component';
import { GuessFormComponent } from './components/child-components/guess-form/guess-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { UpdatePasswordComponent } from './components/child-components/update-password/update-password.component';
import { UpdateUsernameComponent } from './components/child-components/update-username/update-username.component';
import { Top3FilmComponent } from './components/child-components/top3-film/top3-film.component';
import { CaroselloComponent } from './components/child-components/carosello/carosello.component';





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
    MovieListComponent,
     CommentComponent,
    RatingsComponent,
    PosterComponent,
    MovieTableComponent,
    CastDetailComponent,
    ProductionDetailComponent,
    SinossiComponent,
    RankingComponent,
    MovieScoreComponent,
    MovieListBodyComponent,
    SavingFormComponent,
    TimeComponent,
    GameResultComponent,
    GuessDataComponent,
    UpdateRatingComponent,
    UpdateCommentComponent,
    GuessFormComponent,
    ProfileComponent,
    FriendsComponent,
    UpdatePasswordComponent,
    UpdateUsernameComponent,
    Top3FilmComponent,
    CaroselloComponent
    
],


  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
