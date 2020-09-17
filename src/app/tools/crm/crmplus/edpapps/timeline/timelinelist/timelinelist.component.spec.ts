import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinelistComponent } from './timelinelist.component';

describe('TimelinelistComponent', () => {
  let component: TimelinelistComponent;
  let fixture: ComponentFixture<TimelinelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
