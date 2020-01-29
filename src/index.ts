import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { resolvers } from './resolver';

(async () => {
    try {
        const app = express();
        const schema = await buildSchema({
            resolvers,
            container: Container,
        });
        const server = new ApolloServer({
            schema,
            // context: ({ req, res }) => ({ req, res }),
            context: () => {
                // https://typegraphql.ml/docs/dependency-injection.html
                // generate the requestId (it also may come from `express-request-id` or other middleware)
                const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
                const container = Container.of(requestId); // get the scoped container
                const context = { requestId, container }; // create fresh context object
                container.set("context", context); // place context or other data in container
                return context;
            },
            plugins: [
                {
                    requestDidStart: () => ({
                        willSendResponse(requestContext) {
                            // remember to dispose the scoped container to prevent memory leaks
                            Container.reset(requestContext.context.requestId);
                        },
                    }),
                },
            ],
        });
        server.applyMiddleware({ app, cors: false });
        app.listen(5000, () => {
            // tslint:disable-next-line:no-console
            console.log('app running on localhost:5000');
        });
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log('error', e);
    }
})()