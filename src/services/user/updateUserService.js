const dbConnection = require("../../config");

exports.updateUser = async (req) => {
  try {
    const { fname, lname, address, age } = req.body;
    const env = req.user.env; 
    const userId = req.user.userId; 

    // Connect to the correct database
    const db = await dbConnection(env);

    const [user] = await db.execute(
      "UPDATE users SET fname = ?, lname = ?, address = ?, age = ? WHERE id = ?",
      [fname , lname || null, address || null, age, userId]
    );

    // Update user details in the correct database
    const [result] = await db.execute(
      "UPDATE users SET fname = ?, lname = ?, address = ?, age = ? WHERE id = ?",
      [fname || null, lname || null, address || null, age, userId]
    );

    if (result.affectedRows === 0) {
      return { error: "User not found", status: 404 };
    }

    return { message: "User updated successfully!" };

  } catch (error) {
    return { error: "Database error", details: error.message, status: 500 };
  }
};
