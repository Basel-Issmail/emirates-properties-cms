import { TestBed } from '@angular/core/testing';

import { BuilderResolverService } from './builder-resolver.service';

describe('BuilderResolverService', () => {
  let service: BuilderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuilderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
