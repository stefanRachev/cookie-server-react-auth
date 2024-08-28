const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./src/routes")

const PORT = 4000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());


mongoose
  .connect("mongodb://127.0.0.1:27017/dataTestCookie")
  .then(() => console.log("DB successfully connected"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.send("test ok");
});

app.use(router)


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}....`));
