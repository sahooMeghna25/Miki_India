const validateInput = ({ name, email, phone, password, confirmPassword }) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if required fields are empty
  if (!name || !email || !password || !confirmPassword) {
    errors.push("Required fields are required");
  }
  if (!name || name.trim().length < 3) {
    errors.push("Name must be at least 3 characters long.");
  }

  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format.");
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    errors.push("Phone number must be 10 digits.");
  }

  if (!password || !passwordRegex.test(password)) {
    errors.push(
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
    );
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  return errors;
};

//validate for login
const validateLoginInput = (data) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid email format.");
  }

  if (!data.email && !data.phone) {
    errors.push("Either Email or phone number is required.");
  }
  if (!data.password) {
    errors.push("Password is required.");
  }
  return errors;
};

module.exports = { validateInput, validateLoginInput };
