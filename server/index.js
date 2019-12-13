require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ac = require('./authController');

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



app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`));