const db = require("../database/db");

const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM miki_users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const createUser = async (name, email, phone, password) => {
  await db.query(
    "INSERT INTO miki_users (name, email, phone, password) VALUES (?, ?, ?, ?)",
    [name, email, phone || null, password]
  );
};

const getUserByEmailOrPhone = async (email, phone) => {
  // Check if email or phone is provided and run the query accordingly
  const [rows] = await db.query(
    "SELECT * FROM miki_users WHERE email = ? OR phone = ?",
    [email || null, phone || null]
  );
  return rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
  getUserByEmailOrPhone,
};
