import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationrequestComponent } from './quotationrequest.component';

describe('QuotationrequestComponent', () => {
  let component: QuotationrequestComponent;
  let fixture: ComponentFixture<QuotationrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
