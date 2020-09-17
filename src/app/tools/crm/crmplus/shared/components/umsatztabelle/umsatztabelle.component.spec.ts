import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatztabelleComponent } from './umsatztabelle.component';

describe('UmsatztabelleComponent', () => {
  let component: UmsatztabelleComponent;
  let fixture: ComponentFixture<UmsatztabelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatztabelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatztabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
