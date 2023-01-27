import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPostPageRoutingModule } from './view-post-routing.module';

import { ViewPostPage } from './view-post.page';
import { PostComponent } from 'src/app/components/post/post.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPostPageRoutingModule,
    SharedModule
  ],
  declarations: [ViewPostPage]
})
export class ViewPostPageModule {}
