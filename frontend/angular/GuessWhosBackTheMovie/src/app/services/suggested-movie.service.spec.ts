import { TestBed } from '@angular/core/testing';

import { SuggestedMovieService } from './suggested-movie.service';

describe('SuggestedMovieService', () => {
  let service: SuggestedMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestedMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
