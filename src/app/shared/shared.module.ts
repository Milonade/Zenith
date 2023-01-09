import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';




@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [CommonModule, IonicModule, FormsModule, SearchBarComponent]
})
export class SharedModule { }
