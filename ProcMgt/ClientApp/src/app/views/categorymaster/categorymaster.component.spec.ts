import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorymasterComponent } from './categorymaster.component';

describe('CategorymasterComponent', () => {
  let component: CategorymasterComponent;
  let fixture: ComponentFixture<CategorymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
