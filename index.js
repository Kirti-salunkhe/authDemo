const express = require("express");
const app = express();
const dotenv=require("dotenv").config()
const connectDb=require("./config/dbConnection")
const path=require("path")
const cookieParser=require("cookie-parser")
const flash = require("connect-flash");
const session=require("express-session")

const PORT = process.env.PORT || 5000;

connectDb()
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000 },
  })
);
 app.use(flash());

app.use("/",require("./routes/staticRouter"))
app.use("/user",require("./routes/user"))

app.listen(PORT,(err)=>{
    console.log(`app is running on port ${PORT}`)
})
