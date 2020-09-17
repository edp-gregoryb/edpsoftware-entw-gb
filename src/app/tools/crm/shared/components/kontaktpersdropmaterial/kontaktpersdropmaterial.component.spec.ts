import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktpersdropmaterialComponent } from './kontaktpersdropmaterial.component';

describe('KontaktpersdropmaterialComponent', () => {
  let component: KontaktpersdropmaterialComponent;
  let fixture: ComponentFixture<KontaktpersdropmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontaktpersdropmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontaktpersdropmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
