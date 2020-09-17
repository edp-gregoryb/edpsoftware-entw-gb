/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KundenShowComponent } from './kunden-show.component';

describe('KundenShowComponent', () => {
  let component: KundenShowComponent;
  let fixture: ComponentFixture<KundenShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
