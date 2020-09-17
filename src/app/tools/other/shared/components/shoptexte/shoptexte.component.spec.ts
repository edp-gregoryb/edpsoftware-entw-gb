import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoptexteComponent } from './shoptexte.component';

describe('ShoptexteComponent', () => {
  let component: ShoptexteComponent;
  let fixture: ComponentFixture<ShoptexteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoptexteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoptexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
