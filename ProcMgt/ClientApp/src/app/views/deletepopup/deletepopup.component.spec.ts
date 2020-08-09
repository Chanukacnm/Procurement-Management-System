import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepopupComponent } from './deletepopup.component';

describe('DeletepopupComponent', () => {
  let component: DeletepopupComponent;
  let fixture: ComponentFixture<DeletepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
