import { TestBed } from '@angular/core/testing';

import { LocalPeristenceService } from './local-peristence.service';

describe('LocalPeristenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalPeristenceService = TestBed.get(LocalPeristenceService);
    expect(service).toBeTruthy();
  });
});
