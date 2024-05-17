import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserReposComponent } from './user-repos.component';
import { ApiService } from '../services/api.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserReposComponent', () => {
  let component: UserReposComponent;
  let fixture: ComponentFixture<UserReposComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(waitForAsync(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getUserRepos', 'countRepos']);

    TestBed.configureTestingModule({
      declarations: [UserReposComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  


});
