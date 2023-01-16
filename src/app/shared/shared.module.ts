import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [ HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [CommonModule, IonicModule, FormsModule, HeaderComponent]
})
export class SharedModule { }
