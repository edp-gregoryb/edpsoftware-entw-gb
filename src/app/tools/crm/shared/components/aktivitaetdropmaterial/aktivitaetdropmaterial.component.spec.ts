import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivitaetdropmaterialComponent } from './aktivitaetdropmaterial.component';

describe('AktivitaetdropmaterialComponent', () => {
  let component: AktivitaetdropmaterialComponent;
  let fixture: ComponentFixture<AktivitaetdropmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivitaetdropmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivitaetdropmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
