import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

const app = express();
const PORT = 7001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		// obtener el token enviado
		const token = req.headers['authorization'];
		if (token !== 'null') {
			try {
				// verificamos el token del fron end (cliente)
				const usuarioActual = await jwt.verify(token, process.env.SECRETO);
				// agregamos el usuario actual al request
				req.usuarioActual = usuarioActual;

				return {
					usuarioActual
				};
			} catch (err) {
				console.error(err);
			}
		}
	}
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
	console.log(`Server running in ${PORT} port `);
});
