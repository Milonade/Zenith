import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-slider',
  templateUrl: './post-slider.component.html',
  styleUrls: ['./post-slider.component.scss'],
})
export class PostSliderComponent implements OnInit {
  isModalOpen = true;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor() { }

  ngOnInit() { }

}
