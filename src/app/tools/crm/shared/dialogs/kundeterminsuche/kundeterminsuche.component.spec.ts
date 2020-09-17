import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundeterminsucheComponent } from './kundeterminsuche.component';

describe('KundeterminsucheComponent', () => {
  let component: KundeterminsucheComponent;
  let fixture: ComponentFixture<KundeterminsucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundeterminsucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundeterminsucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
