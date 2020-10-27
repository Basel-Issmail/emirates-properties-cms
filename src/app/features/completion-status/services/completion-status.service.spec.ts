import { TestBed } from '@angular/core/testing';

import { CompletionStatusService } from './completion-status.service';

describe('CompletionStatusService', () => {
  let service: CompletionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
