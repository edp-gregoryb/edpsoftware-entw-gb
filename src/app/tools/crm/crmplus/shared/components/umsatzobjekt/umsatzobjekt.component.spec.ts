import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzobjektComponent } from './umsatzobjekt.component';

describe('UmsatzobjektComponent', () => {
  let component: UmsatzobjektComponent;
  let fixture: ComponentFixture<UmsatzobjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzobjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzobjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
