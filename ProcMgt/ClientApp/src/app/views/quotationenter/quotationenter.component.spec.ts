import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationenterComponent } from './quotationenter.component';

describe('QuotationenterComponent', () => {
  let component: QuotationenterComponent;
  let fixture: ComponentFixture<QuotationenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
