import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbodetailComponent } from './abodetail.component';

describe('AbodetailComponent', () => {
  let component: AbodetailComponent;
  let fixture: ComponentFixture<AbodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
