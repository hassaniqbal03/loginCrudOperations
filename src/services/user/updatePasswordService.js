const dbConnection = require("../../config");
const CryptoJS = require("crypto-js");

const SECRET_KEY = "interni";

exports.updatePassword = async (req) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const env = req.user.env; 
    const email = req.user.email; 

    console.log("Fetching user from database...");

    const db = await dbConnection(env);
    const [results] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return { error: "User not found", status: 404 };
    }

    const user = results[0];

  
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== oldPassword) {
      return { error: "Old password is incorrect", status: 401 };
    }

    // Encrypt new password
    const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, SECRET_KEY).toString();

    // Update password in database
    const [result] = await db.execute("UPDATE users SET password = ? WHERE email = ?", [encryptedNewPassword, email]);

    if (result.affectedRows === 0) {
      return { error: "Password update failed", status: 404 };
    }

    return { message: "Password updated successfully!" };

  } catch (error) {
    return { error: "Server error", details: error.message, status: 500 };
  }
};
