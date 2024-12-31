const validateInput = ({ name, email, phone, password, confirmPassword }) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z][a-zA-Z\s-_]*[a-zA-Z]$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if required fields are empty
  if (!name || !email) {
    errors.push("Required fields are required");
  }
  if (!name || name.trim().length < 3 || !nameRegex.test(name)) {
    errors.push(
      "Name must be at least 3 characters long and can only contain letters, spaces, and hyphens. It cannot start or end with spaces."
    );
  }

  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format.");
    console.log("email**", email);
  }

  // Validate phone only if provided
  if (phone && !/^\d{10}$/.test(phone)) {
    errors.push("Phone number must be 10 digits.");
  }

  // Validate password only if provided
  if (password && !passwordRegex.test(password)) {
    errors.push(
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
    );
  }

  // Validate confirmPassword only if both password and confirmPassword are provided
  if (password && confirmPassword && password !== confirmPassword) {
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
