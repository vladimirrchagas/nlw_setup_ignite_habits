// Back-End API RESTfull

// Métodos HTTP: Get, Post, Put, Patch, Delete

import Fastify, { fastify } from 'fastify';

import cors from '@fastify/cors';
import { appRoutes } from './route';

const app = Fastify();


app.register(cors);
app.register(appRoutes)

app.listen ({
    port: 3333
}).then(() => {
    console.log('HTTP Server is running...')
})