import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movie, MovieResponse } from '../interfaces/movie.interface';
import { GenreResponse } from '../interfaces/genre.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  base_url: string = environment.base_url;
  api_key: string = environment.api_key;
  movies: Movie[] = [];
  currentMovie: number = 0;
  recentClose: number = 0;
  sortApi: string = 'vote_average';

  constructor(private http: HttpClient) {}

  getMovies(page: number): Observable<MovieResponse> {
    return this.http
      .get(
        `${this.base_url}/discover/movie/?api_key=${this.api_key}&sort_by=${this.sortApi}.desc&page=${page}`
      )
      .pipe(map((res) => res as MovieResponse));
  }

  getMoviesByTitle(
    movie: string | undefined,
    page?: number
  ): Observable<MovieResponse> {
    return this.http
      .get(
        `${this.base_url}/search/movie?api_key=${this.api_key}&query=${movie}&page=${page}`
      )
      .pipe(map((res) => res as MovieResponse));
  }

  getGenresOfMovies(): Observable<GenreResponse> {
    return this.http
      .get(
        `${this.base_url}/genre/movie/list?api_key=${this.api_key}&language=en-US`
      )
      .pipe(map((res) => res as GenreResponse));
  }

  handleWatchlist(movie: Movie): void {
    const watchlistLocalStorage = localStorage.getItem('watchlist');
    let watchlist: Movie[] = [movie];
    if (watchlistLocalStorage !== null) {
      watchlist = JSON.parse(watchlistLocalStorage);
      if (movie.watchlist) {
        watchlist.splice(
          watchlist.findIndex((watchlist) => watchlist.id === movie.id),
          1
        );
      } else {
        watchlist.push(movie);
      }
    }
    movie.watchlist = !movie.watchlist;
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  handleSeenMovies(movie: Movie) {
    const seenMovieLocalStorage = localStorage.getItem('watchlist');
    let seenMovies: Movie[] = [movie];
    if (seenMovieLocalStorage !== null) {
      seenMovies = JSON.parse(seenMovieLocalStorage);
      let seenMovieValue: Movie | undefined = seenMovies.find(
        (seenMovie) => seenMovie.id === movie.id
      );
      if (seenMovieValue) {
        seenMovieValue.seen_movie = !seenMovieValue.seen_movie;
      }
    }
    localStorage.setItem('watchlist', JSON.stringify(seenMovies));
  }
}
