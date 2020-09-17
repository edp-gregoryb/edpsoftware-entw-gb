import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermindetailComponent } from './termindetail.component';

describe('TermindetailComponent', () => {
  let component: TermindetailComponent;
  let fixture: ComponentFixture<TermindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
