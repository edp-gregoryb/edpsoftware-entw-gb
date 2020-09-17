import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinekundeComponent } from './timelinekunde.component';

describe('TimelinekundeComponent', () => {
  let component: TimelinekundeComponent;
  let fixture: ComponentFixture<TimelinekundeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinekundeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinekundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
