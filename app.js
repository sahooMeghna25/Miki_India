const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const authRoutes = require("../server/routes/authRoutes");
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", authRoutes);

//server calling

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
