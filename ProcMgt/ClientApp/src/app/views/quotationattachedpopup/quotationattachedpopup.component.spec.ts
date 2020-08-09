import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationattachedpopupComponent } from './quotationattachedpopup.component';

describe('QuotationattachedpopupComponent', () => {
  let component: QuotationattachedpopupComponent;
  let fixture: ComponentFixture<QuotationattachedpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationattachedpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationattachedpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
