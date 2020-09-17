import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresselectComponent } from './adresselect.component';

describe('AdresselectComponent', () => {
  let component: AdresselectComponent;
  let fixture: ComponentFixture<AdresselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdresselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
