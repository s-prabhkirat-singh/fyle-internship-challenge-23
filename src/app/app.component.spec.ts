import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should load repositories when searchedUser is not null', () => {
    const mockRepos = [{ id: 1, name: 'Repo 1' }, { id: 2, name: 'Repo 2' }];
    const mockUser = { login: 'testUser' };
    const perPage = 10;
    const page = 1;

    // Set up the component's state
    component.searchedUser = 'testUser';
    component.itemsPerPage = perPage;

    // Mock the getUserRepos API call
    const repoReq = httpMock.expectOne(`https://api.github.com/users/${component.searchedUser}/repos?page=${page}&per_page=${perPage}`);
    expect(repoReq.request.method).toBe('GET');
    repoReq.flush(mockRepos);

    // Mock the getUser API call
    const userReq = httpMock.expectOne(`https://api.github.com/users/${component.searchedUser}`);
    expect(userReq.request.method).toBe('GET');
    userReq.flush(mockUser);

    // Call the loadRepos method
    component.loadRepos();

    // Assert the component's state after loading repositories
    expect(component.repos).toEqual(mockRepos);
    expect(component.totalPages).toEqual(Math.ceil(mockRepos.length / perPage));
  });

  it('should not load repositories when searchedUser is null', () => {
    // Set up the component's state
    component.searchedUser = null;

    // Call the loadRepos method
    component.loadRepos();

    // check that no HTTP requests were made
    httpMock.expectNone(`https://api.github.com/users/testUser/repos`);
    httpMock.expectNone(`https://api.github.com/users/testUser`);

    // check that repositories and totalPages remain unchanged
    expect(component.repos).toEqual([]);
    expect(component.totalPages).toEqual(0);
  });
});
