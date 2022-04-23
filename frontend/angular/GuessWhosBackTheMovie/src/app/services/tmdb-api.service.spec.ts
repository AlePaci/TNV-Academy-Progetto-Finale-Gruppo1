import { TestBed } from '@angular/core/testing';

import { TMDBApiService } from './tmdb-api.service';

describe('TMDBApiService', () => {
  let service: TMDBApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TMDBApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
