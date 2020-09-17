import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzdetailComponent } from './umsatzdetail.component';

describe('UmsatzdetailComponent', () => {
  let component: UmsatzdetailComponent;
  let fixture: ComponentFixture<UmsatzdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
