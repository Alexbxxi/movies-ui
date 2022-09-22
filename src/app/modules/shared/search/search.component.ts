import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() moviesSearchEvent = new EventEmitter<string | undefined>();

  searchMovie = new FormControl('');

  constructor(protected movieService: MovieService) {
    this.sendTxtMovie();
  }

  protected sendTxtMovie(): void {
    this.searchMovie.valueChanges
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        distinctUntilChanged(),
        tap((search) => {
          this.moviesSearchEvent.emit(search);
        })
      )
      .subscribe();
  }
}
