const users = require("../models/users");


module.exports = class loginService {

  static async emailUsers(email) {
    try {
        const user = await users.findOne({ email: email });
        return user;
    } catch (error) {
        console.log(`Usuário não encontrado. ${error}`);
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
