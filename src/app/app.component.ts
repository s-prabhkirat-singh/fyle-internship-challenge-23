import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchedUser: string | null = null;
  repos: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // Default items per page
  totalPages: number = 0;

  constructor(private apiService: ApiService) {}

  searchUser(username: string) {
    if (username.trim() !== '') {
      this.apiService.getUser(username).subscribe((user: any) => {
        this.searchedUser = user.login;
        this.currentPage = 1; // Reset to page 1 when searching
        this.loadRepos();
      });
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchedUser = null;
    this.repos = [];
    this.currentPage = 1;
    this.totalPages = 0;
  }

  loadRepos() {
    if (this.searchedUser) {
      const perPage = this.itemsPerPage;
      const page = this.currentPage;

      this.apiService.getUserRepos(this.searchedUser, page, perPage)
        .subscribe((repos: any[]) => {
          this.repos = repos;
          // Assuming your API returns total count of repositories
          this.totalPages = Math.ceil(repos.length / this.itemsPerPage);
        });
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRepos(); // Reload repositories for the new page
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to page 1 when items per page changes
    this.loadRepos(); // Reload repositories for the new items per page
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
