import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboverwaltungComponent } from './aboverwaltung.component';

describe('AboverwaltungComponent', () => {
  let component: AboverwaltungComponent;
  let fixture: ComponentFixture<AboverwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboverwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboverwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
