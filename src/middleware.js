const jwt = require("jsonwebtoken");
const dbConnection = require("./config");
const SECRET_KEY = process.env.JWT_SECRET || "interni";

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Token is required" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Invalid token " });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded.env) {
      return res.status(403).json({ error: "Environment (env) is missing in token" });
    }

    req.user = decoded;
    req.db = await dbConnection(decoded.env); 

    // Check if the user exists and is not deleted
    const [users] = await req.db.execute("SELECT is_deleted FROM users WHERE id = ?", [decoded.userId]);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (users[0].is_deleted) {
      return res.status(403).json({ error: "Your account has been deleted. Please sign up again." });
    }

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
