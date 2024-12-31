const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");
const SECRET_KEY = "gfg_jwt_secret_key";
const { validateInput, validateLoginInput } = require("../utils/validation");
const {
  findUserByEmail,
  createUser,
  getUserByEmailOrPhone,
} = require("../model/userModel");

const register = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  // Validate input
  const validationErrors = validateInput({
    name,
    email,
    phone,
    password,
    confirmPassword,
  });
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Check if email is already registered
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    await createUser(name, email, phone, hashedPassword);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, phone, password } = req.body;

  // Validate login input
  const validationErrors = validateLoginInput({ email, phone, password });
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Find user by email or phone
    const user = await getUserByEmailOrPhone(email, phone);
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found. Please check your email or phone." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password." });
    }

    // Generate Jwt token here
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "3000ms",
    });
    res.status(200).json({ token, message: "Login Successful!" });
    verifyToken(req, res, () => {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = { register, loginUser };
