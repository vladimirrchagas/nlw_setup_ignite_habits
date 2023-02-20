// Back-End API RESTfull

// Métodos HTTP: Get, Post, Put, Patch, Delete

import Fastify, { fastify } from 'fastify';

import cors from '@fastify/cors';
import { appRoutes } from './route';

const app = Fastify();
const PORT = 3333;


app.register(cors);
app.register(appRoutes)

app.listen ({
    port: PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log(`HTTP Server is running... on port ${PORT}`)
});