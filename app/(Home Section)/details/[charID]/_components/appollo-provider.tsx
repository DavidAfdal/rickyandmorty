"use client"
import React from 'react'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

function Providers({children} : {children:React.ReactNode}) {
  return (
   <ApolloProvider client={client}>
    {children}
   </ApolloProvider>
  )
}

export default Providers