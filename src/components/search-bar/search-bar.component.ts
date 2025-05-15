import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';
  showRecent = false;
  recentSearches: string[] = [];

  @Output() search = new EventEmitter<string>();

  onSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm);

      if (!this.recentSearches.includes(this.searchTerm)) {
        this.recentSearches.unshift(this.searchTerm);
        if (this.recentSearches.length > 5) {
          this.recentSearches.pop();
        }
      }

      this.showRecent = false;
    }
  }

  selectRecent(term: string) {
    this.searchTerm = term;
    this.onSearch();
  }

  removeRecent(term: string) {
    this.recentSearches = this.recentSearches.filter(t => t !== term);
  }

  hideRecentWithDelay() {
    setTimeout(() => {
      this.showRecent = false;
    }, 300); 
  }

  clearRecent() {
    this.recentSearches = [];
  }
}