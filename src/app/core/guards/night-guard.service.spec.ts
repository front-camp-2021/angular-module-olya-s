import { TestBed } from '@angular/core/testing';

import { NightGuardService } from './night-guard.service';

describe('NightGuardService', () => {
  let service: NightGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NightGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
