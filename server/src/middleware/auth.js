

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  console.log("Cookies:", req.cookies); 
  const token = req.cookies.authToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "SOME_SECRET");
    // req.user = await User.findById(decoded.id).select('-password'); // Взимане на потребителя без паролата
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { isAuthenticated };
