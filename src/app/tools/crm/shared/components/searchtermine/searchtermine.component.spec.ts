import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtermineComponent } from './searchtermine.component';

describe('SearchtermineComponent', () => {
  let component: SearchtermineComponent;
  let fixture: ComponentFixture<SearchtermineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchtermineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
