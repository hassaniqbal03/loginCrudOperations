const getAllUsersService = require("../services/user/getAllUsersService"); 
const getUserByIdService = require("../services/user/getUserByIdService"); 
const updateUserService = require("../services/user/updateUserService");
const deleteUserService = require("../services/user/deleteUserService");
const updatePasswordService = require("../services/user/updatePasswordService");

exports.getAllUsers = async (req, res) => {
    res.json(await getAllUsersService.getAllUsers(req));
  };

  exports.getUserById = async (req, res) => {
    res.json(await getUserByIdService.getUserById(req));
  };
  exports.updateUser = async (req, res) => {
    res.json(await updateUserService.updateUser(req));
  };
  exports.deleteUser = async (req, res) => {
    const { userId, env } = req.user;
    res.json(await deleteUserService.deleteUser(userId, env));
  };
  exports.updatePassword = async (req, res) => {
    res.json(await updatePasswordService.updatePassword(req));
  };