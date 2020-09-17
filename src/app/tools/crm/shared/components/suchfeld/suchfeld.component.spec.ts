/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuchfeldComponent } from './suchfeld.component';

describe('SuchfeldComponent', () => {
  let component: SuchfeldComponent;
  let fixture: ComponentFixture<SuchfeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuchfeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuchfeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
