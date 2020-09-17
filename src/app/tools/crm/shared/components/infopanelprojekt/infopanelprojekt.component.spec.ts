import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopanelprojektComponent } from './infopanelprojekt.component';

describe('InfopanelprojektComponent', () => {
  let component: InfopanelprojektComponent;
  let fixture: ComponentFixture<InfopanelprojektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfopanelprojektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopanelprojektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
