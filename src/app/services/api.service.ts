import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.github.com/users';

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${githubUsername}`);
  }

  getUserRepos(username: string, page: number, perPage: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/${username}/repos`, {
      params: { page: page.toString(), per_page: perPage.toString() }
    });
  }
}
