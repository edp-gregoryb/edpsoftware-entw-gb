import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzkundeComponent } from './umsatzkunde.component';

describe('UmsatzkundeComponent', () => {
  let component: UmsatzkundeComponent;
  let fixture: ComponentFixture<UmsatzkundeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzkundeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzkundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
