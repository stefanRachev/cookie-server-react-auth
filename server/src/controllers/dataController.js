const router = require("express").Router();
const Data = require("../models/Data");
const { isAuthenticated } = require("../middleware/auth");


router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const { field1, field2 } = req.body;
    const newData = new Data({
      field1,
      field2,
      author: req.user._id, 
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create data" });
  }
});


router.get("/", isAuthenticated, async (req, res) => {
  try {
    const data = await Data.find().populate("author", "email"); 
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

module.exports = router;
