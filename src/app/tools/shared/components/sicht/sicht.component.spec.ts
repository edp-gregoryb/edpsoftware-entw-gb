import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SichtComponent } from './sicht.component';

describe('SichtComponent', () => {
  let component: SichtComponent;
  let fixture: ComponentFixture<SichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
