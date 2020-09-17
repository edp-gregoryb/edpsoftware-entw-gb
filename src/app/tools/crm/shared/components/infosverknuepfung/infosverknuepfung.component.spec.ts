import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosverknuepfungComponent } from './infosverknuepfung.component';

describe('InfosverknuepfungComponent', () => {
  let component: InfosverknuepfungComponent;
  let fixture: ComponentFixture<InfosverknuepfungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosverknuepfungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosverknuepfungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
