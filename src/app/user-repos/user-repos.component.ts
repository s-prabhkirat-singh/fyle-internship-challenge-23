import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent implements OnInit {
  @Input() username: string | null = null;
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1; // Set default current page to 1
  @Input() itemsPerPage: number = 10; // Default items per page
  @Output() pageChange = new EventEmitter<number>();
  repos: any[] = [];
  noOfRepo=0;
  userData: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if (this.username) {
      this.apiService.getUser(this.username).subscribe(userData => {
        this.userData = userData;
      });
     
    }
    this.loadRepos();
  }

  loadRepos() {
    if (this.username && this.currentPage && this.currentPage <= this.totalPages) {
      const perPage = this.itemsPerPage;
      const page = this.currentPage;

      this.apiService.getUserRepos(this.username, page, perPage).subscribe((repos: any[]) => {
        this.repos = repos;
      });
      this.apiService.countRepos(this.username).subscribe(count => {
        // this.repos = [];
        this.totalPages = Math.ceil(count/perPage );
      });
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      this.loadRepos(); // Reload repositories for the new page
    }
  }
  

  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to page 1 when items per page changes
    this.loadRepos(); // Reload repositories for the new items per page
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
