// services/userService.js
const bcrypt = require('bcrypt');
const User = require('../models/users');

async function getAllUsers() {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (error) {
        throw new Error(`Could not fetch users: ${error.message}`);
    }
}

async function addUsers(data) {
    try {
        const newUser = {
            nome: data.nome,
            email: data.email,
            senha: await bcrypt.hash(data.senha, 10), // Criptografa a senha antes de salvar
        };
        const response = await new User(newUser).save();
        return response;
    } catch (error) {
        throw new Error(`Could not add user: ${error.message}`);
    }
}

async function getUsersbyId(userID) {
    try {
        const user = await User.findById(userID);
        return user;
    } catch (error) {
        throw new Error(`User not found: ${error.message}`);
    }
}

async function updateUsers(id, user) {
    try {
        const updateResponse = await User.updateOne({ _id: id }, { ...user });
        return updateResponse;
    } catch (error) {
        throw new Error(`Could not update user: ${error.message}`);
    }
}

async function deleteUsers(userId) {
    try {
        const deletedResponse = await User.findOneAndDelete({ _id: userId });

        if (!deletedResponse) {
            // Se nenhum usuário foi encontrado para deletar
            throw new Error("Usuário não encontrado");
        }

        // deletado com sucesso
        return { message: `Usuário ${deletedResponse.nome} apagado com sucesso.` };
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

async function emailUsers(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw new Error(`User not found: ${error.message}`);
    }
}

module.exports = {
    getAllUsers,
    addUsers,
    getUsersbyId,
    updateUsers,
    deleteUsers,
    emailUsers,
};
