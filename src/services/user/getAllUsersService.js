const dbConnection = require("../../config");

exports.getAllUsers = async (req) => {
  try {
     const env = req.user.env; 
    const db = await dbConnection(env);

    const [users] = await db.execute("SELECT * FROM users");

    if (users.length === 0) {
      return { message: "No users found in the database." };
    }

    return users;

  } catch (error) {
    return { error: "Database error", details: error.message, status: 500 };
  }
};

