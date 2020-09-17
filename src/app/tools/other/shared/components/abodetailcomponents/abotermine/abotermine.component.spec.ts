import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbotermineComponent } from './abotermine.component';

describe('AbotermineComponent', () => {
  let component: AbotermineComponent;
  let fixture: ComponentFixture<AbotermineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbotermineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbotermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
