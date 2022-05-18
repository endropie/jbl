'use strict';
require("dotenv").config();

const Hapi = require('@hapi/hapi');
const Routers = require('./routers/api');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
                
        routes: {
            cors: true
            // {
            //     "origin": ["http://192.168.1.13:4200"],
            //     "headers": ["Accept", "Content-Type"],
            //     "additionalHeaders": ["X-Requested-With"]
            // }
        }
    });

    await server.register({
        plugin: require('hapi-pgsql'),
        options: {
            database_url: process.env.DATABASE_URL,
        }
    });

    
    server.route(Routers);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();