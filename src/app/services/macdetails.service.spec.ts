import { TestBed } from '@angular/core/testing';

import { MacdetailsService } from './macdetails.service';

describe('MacdetailsService', () => {
  let service: MacdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
