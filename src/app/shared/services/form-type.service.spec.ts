import { TestBed } from '@angular/core/testing';

import { FormTypeService } from './form-type.service';

describe('FormTypeService', () => {
  let service: FormTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
