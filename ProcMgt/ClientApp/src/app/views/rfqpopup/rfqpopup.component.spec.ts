import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqpopupComponent } from './rfqpopup.component';

describe('RfqpopupComponent', () => {
  let component: RfqpopupComponent;
  let fixture: ComponentFixture<RfqpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
