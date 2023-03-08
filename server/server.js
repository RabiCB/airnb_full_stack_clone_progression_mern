const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User.js");
const bycrypt = require("bcryptjs");

require("dotenv").config();

//const mongoose=require("mongoose")
//const cors=require("cors")
const app = express();
const jwt=require("jsonwebtoken")
const CookieParser=require("cookie-parser");

app.use(express.json());
const bcryptSalt = bycrypt.genSaltSync(10);
const jwtsecret="stehbdj/gdgi/srbdhfi"

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(CookieParser())

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  });



app.get("/test", (req, res) => {
  res.json("test is ok");
});


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bycrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async(req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passok=bycrypt.compareSync(password,userDoc.password)
    if(passok){
        jwt.sign({email:userDoc.email,id:userDoc._id, name:userDoc.name },jwtsecret,{},(err,token)=>{
            if(err)throw err;
            res.cookie("token",token).json(userDoc)
            

        })
        
    }
    else{
        res.json("pass incorrect")
    }
  } else {
    res.status(422).json("not found");
  }
});
app.get("/profile",(req,res)=>{
  const {token}=req.cookies
  if(token){
  jwt.verify(token,jwtsecret,{},async (err,userData)=>{
    if(err) throw err
   const {name,email,_id}= await User.findById(userData.id)
    res.json({name,email,_id})
  })
  }
  else{
    res.json(null)
  }
  
})

app.post("/logout",(req,res)=>{
  res.cookie('token','').json("eh")
})

const port = 4000;
app.listen(port, () => {
  console.log("port is running");
});
