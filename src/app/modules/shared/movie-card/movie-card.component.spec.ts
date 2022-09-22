import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovieComponent } from './movie-card.component';

describe('CardMovieComponent', () => {
  let component: CardMovieComponent;
  let fixture: ComponentFixture<CardMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CardMovieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('image could be undefined', () => {
    component.movie = {
      adult: true,
      backdrop_path: '',
      genre_ids: [],
      id: 0,
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      release_date: '',
      title: '',
      video: true,
      vote_average: 0,
      vote_count: 0,
      watchlist: true,
      seen_movie: true,
      genre_names: [],
      poster_path: undefined,
    };
    expect(component.img_path).toBe('./assets/img/img-not-found.png');
  });

  it('image could be a path valid', () => {
    component.movie = {
      adult: true,
      backdrop_path: '',
      genre_ids: [],
      id: 0,
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      release_date: '',
      title: '',
      video: true,
      vote_average: 0,
      vote_count: 0,
      watchlist: true,
      seen_movie: true,
      genre_names: [],
      poster_path: '/iRV0IB5xQeOymuGGUBarTecQVAl.jpg',
    };
    component.ngOnInit();
    expect(component.img_path).toBe(
      (component.BASE_IMG_URL + component.movie.poster_path) as string
    );
  });
});
