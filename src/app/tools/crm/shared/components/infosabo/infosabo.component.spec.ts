import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosaboComponent } from './infosabo.component';

describe('InfosaboComponent', () => {
  let component: InfosaboComponent;
  let fixture: ComponentFixture<InfosaboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosaboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
