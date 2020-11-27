const express = require('express');
const colors = require('colors');
const { saveToLog, getLogs } = require('./logs');
const { getUsers, getUserByID, deleteUser, createUser, updateUser } = require('./handler');
const { OK, NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR_CODE } = require('./data/statusCodes');

const PORT = 8080;
const app = express();

app.listen(PORT, () => console.log(colors.bgBlue(`Listening on http://localhost:${PORT}`)));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome, I\'m listening. . . type something in the URL above');
    saveToLog({msg: 'Welcome page', statusCode: OK});
});

app.get('/users', (req, res) => {
    const { query: queryParams } = req;
    const responseUsers = getUsers(queryParams);
    
    res.send(responseUsers);
});

app.get('/users/:id', (req, res) => {
    let responseUser;
    const { params: { id }} = req;
    let isError = false;
    try {
        responseUser = getUserByID(id);
    } catch (err) {
        isError = true;
        if (err.message === `User No.${id} not found!`) {
            res.status(NOT_FOUND).send(err.message);
            saveToLog({ msg: err.message, statusCode: NOT_FOUND }, true);
        }
        else {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(err.message);
            saveToLog({ msg: err.message, statusCode: INTERNAL_SERVER_ERROR_CODE }, true);
        }
    } 
    if (!isError) {
        res.send(responseUser);
        saveToLog({msg: `Get user No.${id}`, statusCode: OK});
    }
});

app.get('/logs', (req, res) => {
    res.send(getLogs());
    saveToLog({msg: `Get list of last ${getLogs().length + 1} logs`, statusCode: OK});
});

app.delete('/users/:id', (req, res) => {
    const { params: { id }} = req;
    deleteUser(id);
    res.send(`User No.${id} deleted from users`);
    saveToLog({msg: `Delete user No.${id}`, statusCode: OK});
});

app.post('/users', (req, res) => {
    let responseUser;
    const { body: newUser } = req;
    let isError = false;
    try {
        responseUser = createUser(newUser);
    } catch (err) {
        isError = true;
        if (err.message === 'User creation has failed, user creation must include both first and last name') {
            res.status(BAD_REQUEST).send(err.message);
            saveToLog({msg: err.message, statusCode: BAD_REQUEST}, true);
        }
        else {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(err.message);
            saveToLog({ msg: err.message, statusCode: INTERNAL_SERVER_ERROR_CODE }, true);
        }
    }
    if (!isError) {
        res.send(responseUser);
        saveToLog({msg: `New user No.${responseUser.id} created`, statusCode: OK});
    } 
});

app.put('/users/:id', (req, res) => {
    let responseUser;
    const { body: user, params: { id }} = req;
    let isError = false;
    try {
        responseUser = updateUser(user, id);
    } catch (err) {
        isError = true;
        if (err.message === `User No.${id} not found!`) {
            res.status(NOT_FOUND).send(err.message);
            saveToLog({msg: err.message, statusCode: NOT_FOUND}, true);
        }
        else if (err.message.includes('User update has failed')) {
            res.status(BAD_REQUEST).send(err.message);
            saveToLog({msg: err.message, statusCode: BAD_REQUEST}, true);
        } 
        else {
            res.status(INTERNAL_SERVER_ERROR_CODE).send(err.message);
            saveToLog({ msg: err.message, statusCode: INTERNAL_SERVER_ERROR_CODE }, true);
        }
    }
    if (!isError) {
        res.send(responseUser);
        saveToLog({msg: `User No.${id} updated`, statusCode: OK});
    }
});

app.all('/*', (req, res) => {
    res.status(NOT_FOUND).sendFile(`${__dirname}/error.html`);
    saveToLog({msg: 'WRONG ROUTE', statusCode: NOT_FOUND}, true);
});