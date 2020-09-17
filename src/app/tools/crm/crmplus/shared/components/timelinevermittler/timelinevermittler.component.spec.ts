import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinevermittlerComponent } from './timelinevermittler.component';

describe('TimelinevermittlerComponent', () => {
  let component: TimelinevermittlerComponent;
  let fixture: ComponentFixture<TimelinevermittlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinevermittlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinevermittlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
