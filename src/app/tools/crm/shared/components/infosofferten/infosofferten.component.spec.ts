import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosoffertenComponent } from './infosofferten.component';

describe('InfosoffertenComponent', () => {
  let component: InfosoffertenComponent;
  let fixture: ComponentFixture<InfosoffertenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosoffertenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosoffertenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
