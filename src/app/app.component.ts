import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchedUser: string | null = null; // Define searchedUser property
  repos: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadRepos();
  }

  searchUser(username: string) {
    
    if (username.trim() !== '') {
      this.apiService.getUser(username).subscribe((user: any) => {
        this.searchedUser = user.login; // Set the searched user
        this.loadRepos(); // Reload repositories for the new search
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
    this.apiService.getUserRepos('username', this.currentPage, this.itemsPerPage)
      .subscribe((repos: any[]) => {
        this.repos = repos;
        this.totalPages = Math.ceil(this.repos.length / this.itemsPerPage);
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRepos(); // Reload repositories for the new page
  }
 
  

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generate page numbers array
  }
  
}
