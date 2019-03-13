import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

const app = express();
const PORT = 7001;

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
	console.log(`Server running in ${PORT} port `);
});
