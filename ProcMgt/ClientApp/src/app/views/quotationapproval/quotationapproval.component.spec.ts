import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationapprovalComponent } from './quotationapproval.component';

describe('QuotationapprovalComponent', () => {
  let component: QuotationapprovalComponent;
  let fixture: ComponentFixture<QuotationapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
