import { TestBed } from '@angular/core/testing';

import { ProductResolver } from './product.resolver';

describe('ProductService', () => {
  let service: ProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
