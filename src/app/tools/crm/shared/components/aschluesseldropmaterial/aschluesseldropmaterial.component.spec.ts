import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AschluesseldropmaterialComponent } from './aschluesseldropmaterial.component';

describe('AschluesseldropmaterialComponent', () => {
  let component: AschluesseldropmaterialComponent;
  let fixture: ComponentFixture<AschluesseldropmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AschluesseldropmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AschluesseldropmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
