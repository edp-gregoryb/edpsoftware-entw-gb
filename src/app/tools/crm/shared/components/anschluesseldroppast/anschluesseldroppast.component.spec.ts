import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnschluesseldroppastComponent } from './anschluesseldroppast.component';

describe('AnschluesseldroppastComponent', () => {
  let component: AnschluesseldroppastComponent;
  let fixture: ComponentFixture<AnschluesseldroppastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnschluesseldroppastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnschluesseldroppastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
