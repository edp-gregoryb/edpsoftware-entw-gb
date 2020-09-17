import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersomediaComponent } from './headersomedia.component';

describe('HeadersomediaComponent', () => {
  let component: HeadersomediaComponent;
  let fixture: ComponentFixture<HeadersomediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersomediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersomediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
