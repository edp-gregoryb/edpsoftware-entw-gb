import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AufnummerComponent } from './aufnummer.component';

describe('AufnummerComponent', () => {
  let component: AufnummerComponent;
  let fixture: ComponentFixture<AufnummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AufnummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufnummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
