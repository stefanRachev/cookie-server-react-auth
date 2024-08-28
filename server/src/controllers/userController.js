const router = require("express").Router();
const userService = require("../services/userServices");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.register({ email, password });

    res.cookie("authToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login({ email, password });

    res.cookie("authToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
