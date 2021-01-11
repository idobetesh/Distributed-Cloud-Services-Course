const { saveToLog } = require('./logs');
const users = require('./data/users.json');
const { OK } = require('./data/statusCodes');

const isUserValid = (user) => {
    const requiredFields = ['first_name', 'last_name'];
    const isUserValid = requiredFields.every(field => Object.keys(user).includes(field));    

    return isUserValid;s
}

const findUser = (id) => users.find((user) => user.id === parseInt(id));

const getUsers = (queryParams) => {
    let responseUsers = users;
    if (Object.keys(queryParams).length) {
        responseUsers = users.filter((user) => user.country === queryParams.country);
        saveToLog({msg: `Get ${responseUsers.length} users from ${queryParams.country}`, statusCode: OK});
    }
    else {
        saveToLog({msg: 'Get users', statusCode: OK});
    } 

    return responseUsers;
}

const getUserByID = (id) => {
    const user = findUser(id);
    if (!user) {
        errorMessage = `User No.${id} not found!`;
        throw new Error(errorMessage);
    }

    return user;
}

const deleteUser = (id) => {
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    users.splice(userIndex, 1);
}

const createUser = (newUser) => {
    if (!isUserValid(newUser)) {
        const errorMessage = 'User creation has failed, user creation must include both first and last name';
        throw new Error(errorMessage);
    }

    const lastID = users[users.length - 1].id + 1;
    users.push({ id: lastID, ...newUser });

    return findUser(lastID);
}

const updateUser = (user, id) => {
    const userToUpdate = findUser(id);  
    if (!userToUpdate) {
        const errorMessage = `User No.${id} not found!`;
        throw new Error(errorMessage);
    } 
    if (!isUserValid(user)) {
        const errorMessage = `User update has failed ${JSON.stringify(user)}`;
        throw new Error(errorMessage);
    }
    Object.assign(userToUpdate, user);
    
    return userToUpdate;
}

module.exports = { getUsers, getUserByID, deleteUser, createUser, updateUser }