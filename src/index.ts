import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { resolvers } from './resolver';

(async () => {
    try {
        const app = express();
        const schema = await buildSchema({
            resolvers,
        });
        const server = new ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
        });
        server.applyMiddleware({ app, cors: false });
        app.listen(5000, () => {
            // tslint:disable-next-line:no-console
            console.log('app running on port ');
        });
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log('error', e);
    }
})()