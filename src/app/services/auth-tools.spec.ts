import { TestBed } from '@angular/core/testing';
import { AuthToolsService } from './auth-tools';

describe('AuthToolsService', () => {
  let service: AuthToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});