import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchUsername: string = '';

  @Output() searchClicked: EventEmitter<string> = new EventEmitter<string>();

  searchUser() {
    if (this.searchUsername.trim() !== '') {
      this.searchClicked.emit(this.searchUsername.trim());
    }
  }
}
