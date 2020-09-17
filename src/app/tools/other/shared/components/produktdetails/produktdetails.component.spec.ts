import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktdetailsComponent } from './produktdetails.component';

describe('ProduktdetailsComponent', () => {
  let component: ProduktdetailsComponent;
  let fixture: ComponentFixture<ProduktdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
