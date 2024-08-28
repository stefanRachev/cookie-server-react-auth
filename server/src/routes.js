const router = require("express").Router();


const authController = require("./controllers/authController")
const userController = require("./controllers/userController");
const dataController = require("./controllers/dataController");

router.use("/auth",authController)
router.use("/users", userController);
router.use("/data", dataController);

router.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = router;
