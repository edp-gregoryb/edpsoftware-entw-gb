import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzvertreterComponent } from './umsatzvertreter.component';

describe('UmsatzvertreterComponent', () => {
  let component: UmsatzvertreterComponent;
  let fixture: ComponentFixture<UmsatzvertreterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzvertreterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzvertreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
