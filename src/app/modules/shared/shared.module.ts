import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from './movie-card/movie-card.component';
import { MovieDetailComponent } from './movie-card/movie-detail/movie-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from 'src/app/services/movie.service';

@NgModule({
  declarations: [
    CardMovieComponent,
    MovieDetailComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CardMovieComponent,
    MovieDetailComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
  ],
  providers: [MovieService],
})
export class SharedModule {}
