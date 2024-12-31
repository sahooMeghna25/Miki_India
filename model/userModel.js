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

const findUserByGoogleId = async (googleId) => {
  const [rows] = await db.query(
    "SELECT * FROM miki_users WHERE google_id = ?",
    [googleId]
  );
  return rows[0];
};

const createUserWithGoogle = async (name, email, googleId) => {
  await db.query(
    "INSERT INTO miki_users (name, email, google_id) VALUES (?, ?, ?)",
    [name, email, googleId]
  );
};

module.exports = {
  findUserByEmail,
  createUser,
  getUserByEmailOrPhone,
  findUserByGoogleId,
  createUserWithGoogle,
};
