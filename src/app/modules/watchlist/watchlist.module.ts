import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [WatchlistComponent],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ],
})
export class WatchlistModule {}
