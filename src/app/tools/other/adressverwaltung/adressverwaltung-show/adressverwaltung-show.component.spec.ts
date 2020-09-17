import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressverwaltungShowComponent } from './adressverwaltung-show.component';

describe('AdressverwaltungShowComponent', () => {
  let component: AdressverwaltungShowComponent;
  let fixture: ComponentFixture<AdressverwaltungShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressverwaltungShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressverwaltungShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
