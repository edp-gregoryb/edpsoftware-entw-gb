import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KodiComponent } from './kodi.component';

describe('KodiComponent', () => {
  let component: KodiComponent;
  let fixture: ComponentFixture<KodiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KodiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
