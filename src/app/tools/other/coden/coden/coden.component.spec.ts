import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodenComponent } from './coden.component';

describe('CodenComponent', () => {
  let component: CodenComponent;
  let fixture: ComponentFixture<CodenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
