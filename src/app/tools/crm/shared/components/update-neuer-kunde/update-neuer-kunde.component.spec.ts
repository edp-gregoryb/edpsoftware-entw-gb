import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNeuerKundeComponent } from './update-neuer-kunde.component';

describe('UpdateNeuerKundeComponent', () => {
  let component: UpdateNeuerKundeComponent;
  let fixture: ComponentFixture<UpdateNeuerKundeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNeuerKundeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNeuerKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
