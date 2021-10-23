import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMacDetailComponent } from './add-mac-detail.component';

describe('AddMacDetailComponent', () => {
  let component: AddMacDetailComponent;
  let fixture: ComponentFixture<AddMacDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMacDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMacDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
