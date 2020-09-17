import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoshistoryComponent } from './infoshistory.component';

describe('InfoshistoryComponent', () => {
  let component: InfoshistoryComponent;
  let fixture: ComponentFixture<InfoshistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoshistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
