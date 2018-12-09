import { TestBed, inject } from '@angular/core/testing';

import { GraphqlFetchDataService } from './graphql-fetch-data.service';

describe('GraphqlFetchDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphqlFetchDataService]
    });
  });

  it('should be created', inject([GraphqlFetchDataService], (service: GraphqlFetchDataService) => {
    expect(service).toBeTruthy();
  }));
});
