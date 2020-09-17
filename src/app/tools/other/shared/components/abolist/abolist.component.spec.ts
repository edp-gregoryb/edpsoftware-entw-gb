import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbolistComponent } from './abolist.component';

describe('AbolistComponent', () => {
  let component: AbolistComponent;
  let fixture: ComponentFixture<AbolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
