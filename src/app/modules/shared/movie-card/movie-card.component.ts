import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../interfaces/movie.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class CardMovieComponent implements OnInit {
  @Input('movie') movie!: Movie;
  showDialog: boolean = false;
  imgWidth: string = 'w200/';
  BASE_IMG_URL: string = environment.base_img_url + this.imgWidth;
  img_path: string = './assets/img/img-not-found.png';

  constructor(public movieService: MovieService) {}

  ngOnInit() {
    if (this.movie && this.movie.poster_path) {
      this.img_path = this.BASE_IMG_URL + this.movie.poster_path;
    }
  }
}
