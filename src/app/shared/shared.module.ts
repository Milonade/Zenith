import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [SearchBarComponent, HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [CommonModule, IonicModule, FormsModule, SearchBarComponent, HeaderComponent]
})
export class SharedModule { }
