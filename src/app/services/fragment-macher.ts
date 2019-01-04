import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
// @todo use fragments
export const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: []
    }
  }
});
