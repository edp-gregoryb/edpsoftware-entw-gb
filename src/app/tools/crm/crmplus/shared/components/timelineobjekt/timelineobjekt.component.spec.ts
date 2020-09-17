import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineobjektComponent } from './timelineobjekt.component';

describe('TimelineobjektComponent', () => {
  let component: TimelineobjektComponent;
  let fixture: ComponentFixture<TimelineobjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineobjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineobjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
