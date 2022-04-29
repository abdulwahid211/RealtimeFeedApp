import ReactDOM from "react-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
   useSubscription,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  link: link,
  uri: 'http://localhost:2000', //connect to server
  cache: new InMemoryCache()
});

const SUBSCRIPTION = gql`
  subscription {
    Team {
      results{
            id,name,points
           }
    }
  }
`;


const LiveFeed = () => {
  const { data, loading, error } = useSubscription(
    SUBSCRIPTION);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Teams', width: 150 },
    { field: 'points', headerName: 'Points', width: 150 },
  ];
  if (!data) {
    return null;
  }
  const results = data.Team.results;

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid rows={results} columns={columns} initialState={{
        sorting: {
          sortModel: [{ field: 'points', sort: 'desc' }],
        },
      }} />
    </div>
  );
}


function Table() {
  return (
    <div>
      <h2>⚽ Live Premier League Table ⚽ </h2>
      <LiveFeed />
    </div>
  );
}


ReactDOM.render(<ApolloProvider client={client}>
  <Table />
</ApolloProvider>,
  document.getElementById('root'),
);