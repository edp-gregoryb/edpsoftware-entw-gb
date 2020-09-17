import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrzuComponent } from './adrzu.component';

describe('AdrzuComponent', () => {
  let component: AdrzuComponent;
  let fixture: ComponentFixture<AdrzuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdrzuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdrzuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
