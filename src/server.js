require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dbConnection = require("./config");

(async () => {
  try {
    const db = await dbConnection();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
})();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);  // Auth routes
app.use("/api/users", userRoutes); // User CRUD routes

const PORT =  3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
