import { TestBed } from '@angular/core/testing';

import { ApiRest3Service } from './api-rest3.service';

describe('ApiRest3Service', () => {
  let service: ApiRest3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRest3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
