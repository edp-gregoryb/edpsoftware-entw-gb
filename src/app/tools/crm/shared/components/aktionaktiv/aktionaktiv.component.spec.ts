/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AktionaktivComponent } from './aktionaktiv.component';

describe('AktionaktivComponent', () => {
  let component: AktionaktivComponent;
  let fixture: ComponentFixture<AktionaktivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktionaktivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktionaktivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
