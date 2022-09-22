import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  moviesWatchlist: Movie[] = [];
  seenMovies: Movie[] = [];

  constructor(protected movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.currentMovie = 0;
    this.getWatchlist();
    this.getSeenmovies();
  }

  protected getWatchlist(): void {
    const watchlist = localStorage.getItem('watchlist');
    this.moviesWatchlist = watchlist !== null ? JSON.parse(watchlist) : [];
  }

  protected getSeenmovies(): void {
    const seenMovies = localStorage.getItem('seen_movies');
    this.seenMovies = seenMovies !== null ? JSON.parse(seenMovies) : [];
  }

  updateWatchlist(movie: Movie): void {
    this.movieService.handleWatchlist(movie);
    this.getWatchlist();
  }

  addToSeenMovies(movie: Movie): void {
    this.movieService.handleSeenMovies(movie);
    this.getSeenmovies();
  }
}
