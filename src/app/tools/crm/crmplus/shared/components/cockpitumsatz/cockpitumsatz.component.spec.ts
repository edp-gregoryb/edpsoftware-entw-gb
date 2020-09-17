import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitumsatzComponent } from './cockpitumsatz.component';

describe('CockpitumsatzComponent', () => {
  let component: CockpitumsatzComponent;
  let fixture: ComponentFixture<CockpitumsatzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitumsatzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitumsatzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
