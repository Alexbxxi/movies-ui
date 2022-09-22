import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../../services/movie.service';
import { Movie, MovieResponse } from '../../../../interfaces/movie.interface';
import { Genre } from '../../../../interfaces/genre.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];
  currentPage: number = 0;
  totalPages: number = 1;
  filterMoviesByInput: boolean = false;
  searchMovie: string = '';

  constructor(protected movieService: MovieService) {}

  ngOnInit(): void {
    this.getGenresOfMovies();
    this.getMovies();
  }

  getMovies(): void {
    this.currentPage++;
    if (this.currentPage > this.totalPages) {
      return;
    }
    // Validation of services for filter movies
    let service: any;
    if (this.filterMoviesByInput) {
      service = this.movieService.getMoviesByTitle(
        this.searchMovie,
        this.currentPage
      );
    } else {
      service = this.movieService.getMovies(this.currentPage);
    }
    service.subscribe({
      next: (res: MovieResponse) => {
        this.totalPages = res.total_pages;
        this.movies = [...this.movies, ...res.results];
        this.addPropertiesToMovie();
      },
      error: (err: Error) => console.error(err),
    });
  }

  protected getGenresOfMovies(): void {
    this.movieService.getGenresOfMovies().subscribe({
      next: (res) => {
        this.genres = res.genres;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getFilterMovies(searchMovie: string | undefined | any) {
    this.currentPage = 0;
    this.movies = [];
    // Flag for filter movies
    if (searchMovie === '' || undefined) {
      this.filterMoviesByInput = false;
    } else {
      this.filterMoviesByInput = true;
      this.searchMovie = searchMovie;
    }
    this.getMovies();
  }

  protected addPropertiesToMovie(): void {
    this.movies.map((movie: Movie) => {
      this.verificateWatchlist(movie);
      this.setGenreNames(movie);
    });
  }

  protected verificateWatchlist(movie: Movie): void {
    const watchlistLocalStorage = localStorage.getItem('watchlist');
    if (watchlistLocalStorage !== null) {
      movie.watchlist = JSON.parse(watchlistLocalStorage).find(
        (movieWatchlist: Movie) => movieWatchlist.id === movie.id
      )
        ? true
        : false;
    } else {
      movie.watchlist = false;
    }
  }

  protected setGenreNames(movie: Movie): void {
    movie.genre_names = movie.genre_ids.map((movie_genre_id) => {
      let genreLabel: string = '';
      this.genres.find((genre) => {
        if (movie_genre_id === genre.id) {
          genreLabel = genre.name;
        }
      });
      return genreLabel;
    });
  }

  sendDetails(movie: Movie): void {
    // Verification of the card
    if (this.movieService.recentClose === movie.id) {
      this.movieService.recentClose = 0;
      return;
    }
    setTimeout(() => {
      this.movieService.currentMovie = movie.id;
    }, 150);
  }
}
