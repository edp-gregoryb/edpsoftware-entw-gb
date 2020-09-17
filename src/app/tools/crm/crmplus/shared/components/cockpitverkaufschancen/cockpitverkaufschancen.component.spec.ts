import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitverkaufschancenComponent } from './cockpitverkaufschancen.component';

describe('CockpitverkaufschancenComponent', () => {
  let component: CockpitverkaufschancenComponent;
  let fixture: ComponentFixture<CockpitverkaufschancenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitverkaufschancenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitverkaufschancenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
