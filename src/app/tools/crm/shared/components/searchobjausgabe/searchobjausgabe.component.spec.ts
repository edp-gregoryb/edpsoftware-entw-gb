import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchobjausgabeComponent } from './searchobjausgabe.component';

describe('SearchobjausgabeComponent', () => {
  let component: SearchobjausgabeComponent;
  let fixture: ComponentFixture<SearchobjausgabeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchobjausgabeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchobjausgabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
