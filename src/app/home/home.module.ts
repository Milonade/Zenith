import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostSliderComponent } from 'src/app/components/post-slider/post-slider.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  declarations: [HomePage, PostSliderComponent, PostComponent],

})
export class HomePageModule {}
