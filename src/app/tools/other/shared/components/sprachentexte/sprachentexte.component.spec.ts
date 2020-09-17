import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprachentexteComponent } from './sprachentexte.component';

describe('SprachentexteComponent', () => {
  let component: SprachentexteComponent;
  let fixture: ComponentFixture<SprachentexteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprachentexteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprachentexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
