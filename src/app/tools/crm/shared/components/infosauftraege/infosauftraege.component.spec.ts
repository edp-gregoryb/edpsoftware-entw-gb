import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosauftraegeComponent } from './infosauftraege.component';

describe('InfosauftraegeComponent', () => {
  let component: InfosauftraegeComponent;
  let fixture: ComponentFixture<InfosauftraegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosauftraegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosauftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
