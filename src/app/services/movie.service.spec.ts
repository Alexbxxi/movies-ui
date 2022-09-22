import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service should return movies', (done: DoneFn) => {
    service.getMovies(1).subscribe((movie) => {
      expect(movie.results.length).toBe(20);
      done();
    });
    expect(service).toBeTruthy();
  });

  it('service should return genres', (done: DoneFn) => {
    service.getGenresOfMovies().subscribe((res) => {
      expect(res.genres.length).toBeGreaterThan(0);
      done();
    });
    expect(service).toBeTruthy();
  });

  it('service should return movies by title', (done: DoneFn) => {
    service.getMoviesByTitle('Thor').subscribe((movie) => {
      expect(movie.results.length).toBeGreaterThan(0);
      done();
    });
    expect(service).toBeTruthy();
  });
});
