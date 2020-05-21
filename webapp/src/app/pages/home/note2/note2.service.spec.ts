import { TestBed } from '@angular/core/testing';

import { Note2Service } from './note2.service';

describe('Note2Service', () => {
  let service: Note2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Note2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
