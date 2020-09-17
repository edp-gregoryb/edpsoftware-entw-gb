import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterdropmaterialComponent } from './mitarbeiterdropmaterial.component';

describe('MitarbeiterdropmaterialComponent', () => {
  let component: MitarbeiterdropmaterialComponent;
  let fixture: ComponentFixture<MitarbeiterdropmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitarbeiterdropmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitarbeiterdropmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
