
import { GraphQLServer  } from 'graphql-yoga'
 import { typeDefs } from "./schema/cars"
import { resolvers } from "./resolvers/cars"

const PORT = 2000;

const users = [];

const server = new GraphQLServer({ typeDefs, resolvers  });

const options = {
    port: PORT,
  };
  
  server.start(options, ({ port }) => {
    console.log(
      `Graphql Server started, listening on port ${port} for incoming requests.`
    );
  });
  

