import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinedetailComponent } from './timelinedetail.component';

describe('TimelinedetailComponent', () => {
  let component: TimelinedetailComponent;
  let fixture: ComponentFixture<TimelinedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
