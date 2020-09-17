/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchpanelMerkmaleComponent } from './searchpanel-merkmale.component';

describe('SearchpanelMerkmaleComponent', () => {
  let component: SearchpanelMerkmaleComponent;
  let fixture: ComponentFixture<SearchpanelMerkmaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpanelMerkmaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpanelMerkmaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
