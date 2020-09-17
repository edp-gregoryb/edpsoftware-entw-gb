import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpickerdialogComponent } from './colorpickerdialog.component';

describe('ColorpickerdialogComponent', () => {
  let component: ColorpickerdialogComponent;
  let fixture: ComponentFixture<ColorpickerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorpickerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorpickerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
