const dbConnection = require("../../config");

exports.deleteUser = async (id, env) => {
  try {
    if (!env) {
      return { error: "Environment is missing. Cannot determine database.", status: 400 };
    }

    const db = await dbConnection(env); 

    const [userCheck] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (userCheck.length === 0) {
      return { error: "User not found", status: 404 };
    }


    await db.execute("UPDATE users SET is_deleted = 1 WHERE id = ?", [id]);

    return { message: "User deleted successfully!" };

  } catch (error) {
    return { error: "Database error", details: error.message, status: 500 };
  }
};
