const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth")

router.get("/check", isAuthenticated, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

module.exports = router;
