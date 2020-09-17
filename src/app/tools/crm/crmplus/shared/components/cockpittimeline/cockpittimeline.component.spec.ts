import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpittimelineComponent } from './cockpittimeline.component';

describe('CockpittimelineComponent', () => {
  let component: CockpittimelineComponent;
  let fixture: ComponentFixture<CockpittimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpittimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpittimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
