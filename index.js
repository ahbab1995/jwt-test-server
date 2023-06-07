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
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) =>{
      if(err){
          return res.status(403).send({message: 'forbidden'})
      }
      req.decoded= decoded;
      next();
    })
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
    res.status(401).send({success: false});
  }
});

app.get('/orderlist', verifyJWT, (req, res) =>{
  res.send([{id: 1, item: 'alo'}, {id: 2, item: 'tomato'}])
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
