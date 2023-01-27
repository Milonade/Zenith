import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from '../components/post/post.component';


@NgModule({
  declarations: [ HeaderComponent, PostComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [CommonModule, IonicModule, FormsModule, HeaderComponent, PostComponent]
})
export class SharedModule { }
