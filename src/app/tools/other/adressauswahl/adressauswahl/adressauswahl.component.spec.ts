import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressauswahlComponent } from './adressauswahl.component';

describe('AdressauswahlComponent', () => {
  let component: AdressauswahlComponent;
  let fixture: ComponentFixture<AdressauswahlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressauswahlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressauswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
