// const dbConnection = require("../../config");

// exports.getUserById = async (req) => {
//   try {
//     const env = req.user.env; 
//     const userId = req.user.userId; 
//     const db = await dbConnection(env);

//     const [result] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

//     if (result.length === 0) {
//       return { error: "User not found", status: 404 };
//     }

//     return result[0]; 

//   } catch (error) {
//     return { error: "Database error", details: error.message, status: 500 };
//   }
// };
const dbConnection = require("../../config");
const { decryptEmail } = require("../../crypto");

exports.getUserById = async (req) => {
  try {
    const db = await dbConnection(req.user.env);
    const [result] = await db.query("SELECT id, fname, lname, username, email, address, age FROM users WHERE id = ?", [req.user.userId]);

    if (result.length === 0) {
      return { error: "User not found", status: 404 };
    }
    console.log("Encrypted Email from DB:", user.email);
    let user = result[0];
    user.email = decryptEmail(user.email); // Decrypt Email before returning
    console.log("Decrypted Email:", user.email);
    return user;
  } catch (error) {
    return { error: "Database error", details: error.message, status: 500 };
  }
};
