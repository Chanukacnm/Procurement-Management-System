import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemtypmasterComponent } from './itemtypmaster.component';

describe('ItemtypmasterComponent', () => {
  let component: ItemtypmasterComponent;
  let fixture: ComponentFixture<ItemtypmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemtypmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemtypmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
