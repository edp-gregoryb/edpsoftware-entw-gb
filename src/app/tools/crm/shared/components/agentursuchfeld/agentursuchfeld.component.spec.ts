/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgentursuchfeldComponent } from './agentursuchfeld.component';

describe('AgentursuchfeldComponent', () => {
  let component: AgentursuchfeldComponent;
  let fixture: ComponentFixture<AgentursuchfeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentursuchfeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentursuchfeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
