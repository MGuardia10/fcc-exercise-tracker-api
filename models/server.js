const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        //Routes
        this.paths = {
            home: '/',
            users: '/api/users'
        }

        //DB connection
        this.mongoConnect();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async mongoConnect(){
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // body parser
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        // public directory
        this.app.use( express.static( 'public' ) );
    }

    routes() {
        this.app.use(this.paths.home, require('../routes/home'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}


module.exports = Server;