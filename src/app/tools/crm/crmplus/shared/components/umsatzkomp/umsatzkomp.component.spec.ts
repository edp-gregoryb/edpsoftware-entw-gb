import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzkompComponent } from './umsatzkomp.component';

describe('UmsatzkompComponent', () => {
  let component: UmsatzkompComponent;
  let fixture: ComponentFixture<UmsatzkompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzkompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzkompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
