import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unexpected requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', () => {
    const mockUserData = {
      login: 'testUser',
      name: 'Test User',
      bio: 'This is a test bio',
     
    };

    service.getUser('testUser').subscribe(userData => {
      expect(userData).toEqual(mockUserData);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testUser');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should get user repos', () => {
    const mockRepos = [
      { name: 'Repo 1', description: 'Test repo 1' },
      { name: 'Repo 2', description: 'Test repo 2' },
      
    ];

    service.getUserRepos('testUser', 1, 10).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testUser/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

 
});
