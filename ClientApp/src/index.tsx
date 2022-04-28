import ReactDOM  from "react-dom";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient, } from 'graphql-ws';
import { WebSocketLink } from "@apollo/client/link/ws";

// const wsLink = new GraphQLWsLink(createClient({
//     url: 'ws://localhost:2000',
//   }));

  const link = new WebSocketLink({
    uri: `ws://localhost:2000/`,
    options: {
      reconnect: true,
    },
});

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,useSubscription,
    gql
  } from "@apollo/client";

  const client = new ApolloClient({
    link: link,
    uri: 'http://localhost:2000', //connect to server
    cache: new InMemoryCache()
  });

//   const httpLink = new HttpLink({
//     uri: 'http://localhost:2000/graphql'
//   });

//   const splitLink = split(
//     ({ query }) => {
//       const definition = getMainDefinition(query);
//       return (
//         definition.kind === 'OperationDefinition' &&
//         definition.operation === 'subscription'
//       );
//     },
//     wsLink,
//     httpLink,
//   );

  const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    getCars {
        query data{
            id,name
           }
    }
  }
`;

function LatestComment() {
    const { data ,loading,error } = useSubscription(
      COMMENTS_SUBSCRIPTION);
      console.log("Output: "+data?.getCars.data[0].name);
      if (!data) {
        return null;
      }
    return <h4>New comment: {!loading && data?.getCars.data[0].name}</h4>;
  }

// import {App }from "./App"


//   client
//   .query({
//     query: gql`
//       query {
//         getCars {
//           id,name
//         }
//       }
//     `
//   })
//   .then(result => console.log("Output:  "+result.data.getCars[1].name));

//   const DATA_SHIT = gql`
//   query {
//     getCars {
//       id,name
//     }
//   }
// `;

// function ExchangeRates() {
//     const { loading, error, data } = useQuery(DATA_SHIT);
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :(</p>;
  
//     return data.getCars.map(({ id, name }) => (
//       <div key={id}>
//         <p>
//           Id {id}: {name}
//         </p>
//       </div>
//     ));
//   }

  function App() {
    return (
      <div>
        <h2>My first Apollo app 🚀</h2>
        <LatestComment />
      </div>
    );
  }


ReactDOM.render(<ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);