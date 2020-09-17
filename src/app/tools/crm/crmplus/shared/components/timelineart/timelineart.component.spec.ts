import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineartComponent } from './timelineart.component';

describe('TimelineartComponent', () => {
  let component: TimelineartComponent;
  let fixture: ComponentFixture<TimelineartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
