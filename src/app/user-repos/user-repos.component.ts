import { Component, EventEmitter,Input, OnInit,Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent implements OnInit {
  @Input() username: string | null = null;
  @Input() totalPages: number = 0;
  @Input() currentPage: number | null = null;
  @Output() pageChange = new EventEmitter<number>(); // Add totalPages as an input
  repos: any[] = [];
  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if (this.username) {
      const page = 1; // Default page
      const perPage = 4; // Default items per page

      this.apiService.getUserRepos(this.username, page, perPage).subscribe((repos: any[]) => {
        this.repos = repos;
      });
    }
  }
}
