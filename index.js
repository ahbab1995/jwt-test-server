const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const verifyJWT = (req,res,next) =>{
  const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'unauthorized'});
    }
    const token = authHeader.split(' ')[1];
}

app.post("/login", (req, res) => {
  const user = req.body;

  if (user.email === "khan@gmail.com" && user.password === "123456") {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "10h" }
    );
    res.send({ success: true, accessToken });
  } else {
    res.send({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
