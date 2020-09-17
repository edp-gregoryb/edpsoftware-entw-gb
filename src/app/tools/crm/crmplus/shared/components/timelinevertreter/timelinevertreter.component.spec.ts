import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinevertreterComponent } from './timelinevertreter.component';

describe('TimelinevertreterComponent', () => {
  let component: TimelinevertreterComponent;
  let fixture: ComponentFixture<TimelinevertreterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinevertreterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinevertreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
