import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KovlComponent } from './kovl.component';

describe('KovlComponent', () => {
  let component: KovlComponent;
  let fixture: ComponentFixture<KovlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KovlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KovlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
