import { TestBed } from '@angular/core/testing';

import { PreferredMovieService } from './preferred-movie.service';

describe('PreferredMovieService', () => {
  let service: PreferredMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferredMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
