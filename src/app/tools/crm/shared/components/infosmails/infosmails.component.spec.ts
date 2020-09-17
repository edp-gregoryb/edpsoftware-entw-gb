import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosmailsComponent } from './infosmails.component';

describe('InfosmailsComponent', () => {
  let component: InfosmailsComponent;
  let fixture: ComponentFixture<InfosmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
