import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';

export const fragmentMacher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Entity',
          possibleTypes: [
            {name: 'NodePage'}
          ]
        }
      ]
    }
  }
});
