import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenturwechselComponent } from './agenturwechsel.component';

describe('AgenturwechselComponent', () => {
  let component: AgenturwechselComponent;
  let fixture: ComponentFixture<AgenturwechselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenturwechselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenturwechselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
