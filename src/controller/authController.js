const registerService = require("../services/auth/registerService");
const loginService = require("../services/auth/loginService");

exports.register = async (req, res) => {
  res.json(await registerService.registerUser(req.body));
};

exports.login = async (req, res) => {
  res.json(await loginService.loginUser(req.body));
};
