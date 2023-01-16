import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // Searchbar
  showSearch = false;
  items: any[] = [{ name: 'item 1' }, { name: 'item 2' }, { name: 'item 3' }];
  filteredItems: any[];

  showSearchBar(){
    this.showSearch = !this.showSearch;
  }

  filterItems(event: any) {
    this.filteredItems = this.items.filter(item => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

}
