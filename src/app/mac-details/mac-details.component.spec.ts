import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacDetailsComponent } from './mac-details.component';

describe('MacDetailsComponent', () => {
  let component: MacDetailsComponent;
  let fixture: ComponentFixture<MacDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
