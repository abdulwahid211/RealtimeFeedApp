
import { GraphQLServer,PubSub   } from 'graphql-yoga'
import { typeDefs } from "./schema/teams"
import { resolvers } from "./resolvers/teams"
import * as express from "express"
const PORT = 2000;
const pubsub = new PubSub();
const app = express();

const server = new GraphQLServer({ typeDefs, resolvers, context:{pubsub}  });
// server.use(express.json())
// server.use(express.static("../../../public"))
const options = {
    port: PORT
  };
  
  server.start(options, ({ port }) => {
    console.log(
      `Graphql Server started, listening on port  ${port} for incoming requests.`
    );
  });
  

