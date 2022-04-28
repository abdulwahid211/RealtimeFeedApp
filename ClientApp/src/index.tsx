import ReactDOM from "react-dom";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient, } from 'graphql-ws';
import { WebSocketLink } from "@apollo/client/link/ws";

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
  useQuery, useSubscription,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  link: link,
  uri: 'http://localhost:2000', //connect to server
  cache: new InMemoryCache()
});

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    getAllTeams {
      results{
            id,name,points
           }
    }
  }
`;

const  LatestComment = () => {
  const { data, loading, error } = useSubscription(
    COMMENTS_SUBSCRIPTION);
  if (!data) {
    return null;
  }
  const results = data.getAllTeams.results;

  return   <ul>
  {results.map(({name, id,points}:any) => (
        <li key={id}>{name} Points {}</li>
      ))}

  </ul>
  ;
}



// client
// .query({
//   query: gql`
//     query {
//       getAllTeams {
//         id,name
//       }
//     }
//   `
// })
// .then(result => console.log("Output:  "+result.data.getAllTeams[1].name));

const DATA_SHIT = gql`
  query {
    getAllTeams {
      id,name
    }
  }
`;


function App() {

  const { loading, error, data } = useQuery(DATA_SHIT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // data..map(({ id, name }) => (
  //   <div key={id}>
  //     <p>
  //       Id {id}: {name}
  //     </p>
  //   </div>
  // ));

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      {
  data.getAllTeams.map(({ id, name }) => (
    <div key={id}>
      <p>
        Id {id}: {name}
      </p>
    </div>
  ))



      }
      <LatestComment />
    </div>
  );
}


ReactDOM.render(<ApolloProvider client={client}>
  <App />
</ApolloProvider>,
  document.getElementById('root'),
);