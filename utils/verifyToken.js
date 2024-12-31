// verifyToken.js

const jwt = require("jsonwebtoken");
const SECRET_KEY = "gfg_jwt_secret_key";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
