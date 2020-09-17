import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresssucheComponent } from './adresssuche.component';

describe('AdresssucheComponent', () => {
  let component: AdresssucheComponent;
  let fixture: ComponentFixture<AdresssucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdresssucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresssucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
