
const jwt = require("jsonwebtoken");
const dbConnection = require("../../config");
const { decryptPassword } = require("../../crypto");
const SECRET_KEY = "interni";

exports.loginUser = async (data) => {
  try {
    const { email, password, env } = data;

    const db = await dbConnection(env);

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return { error: "Invalid credentials", status: 401 };
    }

    const user = users[0];

    if (user.is_deleted) {
      return { error: "Your account has been deleted. Please sign up again.", status: 403 };
    }

    const decryptedPassword = decryptPassword(user.password);
    if (decryptedPassword !== password) {
      return { error: "Invalid credentials", status: 401 };
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, env },
      SECRET_KEY,
      { expiresIn: "3h" }
    );

    return { message: "Login successful", token };

  } catch (error) {
    return { error: "Server error", details: error.message, status: 500 };
  }
};
