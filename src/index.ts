import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql';

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const PORT = process.env.PORT || 3000;

    app.use(bodyParser.json({ limit: '2mb' }));
    app.use(cookieParser(process.env.SECRET));
    app.use(compression());

    app.use(express.static(`${__dirname}/the-shortlist-client`));
    app.get('/*', (_req, res) => {
        res.sendFile(`${__dirname}/the-shortlist-client/index.html`);
    });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ db, req, res }),
    });

    server.applyMiddleware({ app, path: '/api' });
    app.listen(PORT);

    console.log(`[app] : http://localhost:${PORT}`);
};

mount(express());
