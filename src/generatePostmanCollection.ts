import express from 'express';
import listEndpoints from 'express-list-endpoints';
import fs from 'fs';

import app from './app'; // Importa tu instancia de Express

const endpoints = listEndpoints(app);

const postmanCollection = {
  info: {
    name: 'My API Collection',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  },
  item: endpoints.map((endpoint) => ({
    name: `${endpoint.path} [${endpoint.methods.join(', ')}]`,
    request: {
      method: endpoint.methods[0], // Toma el primer método
      url: {
        raw: `http://localhost:3000${endpoint.path}`,
        protocol: 'http',
        host: ['localhost'],
        port: '3000',
        path: endpoint.path.split('/').filter(Boolean),
      },
    },
  })),
};

fs.writeFileSync('postman_collection.json', JSON.stringify(postmanCollection, null, 2));

console.log('Postman collection generated: postman_collection.json');
