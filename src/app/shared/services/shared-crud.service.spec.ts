import { TestBed } from '@angular/core/testing';

import { SharedCrudService } from './shared-crud.service';

describe('SharedCrudService', () => {
  let service: SharedCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
