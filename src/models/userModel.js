const db = require("../config");

const User = {
    getAllUsers: async () => {
        const [users] = await db.query("SELECT * FROM users");
        return users.length === 0 ? { message: "No users found." } : users;
    },

    getUserById: async (id) => {
        const [result] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        return result.length === 0 ? { error: "User not found" } : result[0];
    },

    createUser: async (user) => {
        const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        [user.name, user.email, user.password]);
        return { message: "User created successfully", userId: result.insertId };
    },

    updateUser: async (id, user) => {
        const [result] = await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", 
        [user.name, user.email, id]);
        return result.affectedRows === 0 ? { error: "User not found" } : { message: "User updated successfully" };
    },

    deleteUser: async (id) => {
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows === 0 ? { error: "User not found" } : { message: "User deleted successfully" };
    }
};

module.exports = User;
