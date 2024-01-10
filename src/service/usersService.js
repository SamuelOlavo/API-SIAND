const users = require("../models/users");


module.exports = class userService {

  static async getAllUsers() {
    try {
      const allUser = await Users.find();
      return allUser;
    } catch (error) {
      console.log(`Could not fetch Userss ${error}`);
    }
  }

  static async addUsers(data) {
    try {
      const newUsers = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,        
      };
      const response = await new Users(newUsers).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsersbyId(userID) {
    try {
      const user = await Users.findById({ _id: userID });
      return user;
    } catch (error) {
      console.log(`users not found. ${error}`);
    }
  }

  static async updateUsers(id, user) {
    try {
      const updateResponse = await users.updateOne(
        { _id: id },
        { ...user}
      );
      return updateResponse;
    } catch (error) {
      console.log(`Could not update users ${error}`);
    }
  }

  static async deleteUsers(userId) {
    try {
      const deletedResponse = await users.findOneAndDelete({ _id: userId });
      return deletedResponse;
    } catch (error) {
      console.log(`Could not delete User ${error}`);
    }
  }

  static async emailUsers(email) {
    try {
        const user = await users.findOne({ email: email });
        return user;
    } catch (error) {
        console.log(`Usuário não encontrado. ${error}`);
    }
}
};
