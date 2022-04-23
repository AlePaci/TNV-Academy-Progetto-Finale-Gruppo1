import { TestBed } from '@angular/core/testing';

import { AccessApiService } from './access-api.service';

describe('AccessApiService', () => {
  let service: AccessApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
