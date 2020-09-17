import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundentermindetailComponent } from './kundentermindetail.component';

describe('KundentermindetailComponent', () => {
  let component: KundentermindetailComponent;
  let fixture: ComponentFixture<KundentermindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundentermindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundentermindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
