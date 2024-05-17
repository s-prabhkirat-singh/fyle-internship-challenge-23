import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchClicked event when searchUser is called with a non-empty input', () => {
    spyOn(component.searchClicked, 'emit');

    component.searchUsername = 'testUser';
    component.searchUser();

    expect(component.searchClicked.emit).toHaveBeenCalledWith('testUser');
  });

  it('should not emit searchClicked event when searchUser is called with an empty input', () => {
    spyOn(component.searchClicked, 'emit');

    component.searchUsername = '';
    component.searchUser();

    expect(component.searchClicked.emit).not.toHaveBeenCalled();
  });

 
});
