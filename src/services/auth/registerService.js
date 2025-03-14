const dbConnection = require("../../config");
const { encryptPassword } = require("../../crypto");

exports.registerUser = async (data) => { 
  try {
    const { fname, lname, username, email, address, password, age, env } = data;

    // Connect to the correct database
    const db = await dbConnection(env);
    const encryptedPassword = encryptPassword(password);

    const [result] = await db.execute(
      "INSERT INTO users (fname, lname, username, email, address, password, age) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [fname || null, lname || null, username, email, address || null, encryptedPassword, age]
    );

    return { message: `User registered successfully!`, userId: result.insertId };

  } catch (error) {
    console.error("Registration Error:", error);
    if(error.code == 'ER_DUP_ENTRY'){
      return { error: "Something Wrong", details: 'Duplicate Email or Username found.', status: 400 };
    }
  }
};