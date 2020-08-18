import { TestBed } from '@angular/core/testing';

import { MySecondGuard } from './my-second.guard';

describe('MySecondGuard', () => {
  let guard: MySecondGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MySecondGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
