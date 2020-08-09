import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArnpopupComponent } from './arnpopup.component';

describe('ArnpopupComponent', () => {
  let component: ArnpopupComponent;
  let fixture: ComponentFixture<ArnpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArnpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArnpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
