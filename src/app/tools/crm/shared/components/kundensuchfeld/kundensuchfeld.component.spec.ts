/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KundensuchfeldComponent } from './kundensuchfeld.component';

describe('KundensuchfeldComponent', () => {
  let component: KundensuchfeldComponent;
  let fixture: ComponentFixture<KundensuchfeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundensuchfeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundensuchfeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
