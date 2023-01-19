import { TestBed } from '@angular/core/testing';

import { ImgInterceptorService } from './img-interceptor.service';

describe('ImgInterceptorService', () => {
  let service: ImgInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
