import { TestBed, inject } from '@angular/core/testing';

import { SprsService } from './sprs.service';

describe('SprsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprsService]
    });
  });

  it('should be created', inject([SprsService], (service: SprsService) => {
    expect(service).toBeTruthy();
  }));
});
