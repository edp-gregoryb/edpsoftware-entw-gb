import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzvermittlerComponent } from './umsatzvermittler.component';

describe('UmsatzvermittlerComponent', () => {
  let component: UmsatzvermittlerComponent;
  let fixture: ComponentFixture<UmsatzvermittlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzvermittlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzvermittlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
