import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemgroupComponent } from './itemgroup.component';

describe('ItemgroupComponent', () => {
  let component: ItemgroupComponent;
  let fixture: ComponentFixture<ItemgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
