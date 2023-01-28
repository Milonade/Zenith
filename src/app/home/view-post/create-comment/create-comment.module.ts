import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCommentPageRoutingModule } from './create-comment-routing.module';

import { CreateCommentPage } from './create-comment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCommentPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateCommentPage]
})
export class CreateCommentPageModule {}
