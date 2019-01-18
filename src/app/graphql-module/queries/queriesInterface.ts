export interface graphqlQuery {
  query: string;
  fragment?: string;
  resultIsMultipleFragments?: boolean;
}

export interface graphqlQueries {
  queries:{[operationName: string]: graphqlQuery}
}
