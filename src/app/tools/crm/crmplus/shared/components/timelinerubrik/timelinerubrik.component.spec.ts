import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinerubrikComponent } from './timelinerubrik.component';

describe('TimelinerubrikComponent', () => {
  let component: TimelinerubrikComponent;
  let fixture: ComponentFixture<TimelinerubrikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinerubrikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinerubrikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
