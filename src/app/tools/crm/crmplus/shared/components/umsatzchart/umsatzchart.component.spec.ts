import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzchartComponent } from './umsatzchart.component';

describe('UmsatzchartComponent', () => {
  let component: UmsatzchartComponent;
  let fixture: ComponentFixture<UmsatzchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
