import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  @Input('movie') movie!: Movie;
  constructor(protected movieService: MovieService) {}

  closeDetails() {
    this.movieService.recentClose = this.movieService.currentMovie;
    this.movieService.currentMovie = 0;
  }
}
