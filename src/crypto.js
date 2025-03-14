const CryptoJS = require("crypto-js");
const SECRET_KEY = "interni";
exports.encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

exports.decryptPassword = (encryptedPassword) => {
    return CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};


