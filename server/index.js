require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const am = require('./authMiddleware');
const ac = require('./authController');
const lc = require('./listingController');

const app = express();

app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
});

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
);

app.post('/auth/register', ac.register);

app.post('/auth/login', ac.login);

app.get('/auth/logout', ac.logout);

app.get('/api/listings', am.usersOnly, lc.getAll);



app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`));