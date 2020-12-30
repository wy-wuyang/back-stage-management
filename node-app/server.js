// 引入express
const express = require("express");

// 引入mongoose进行连接mongodb数据库
const mongoose = require("mongoose");

// 引入body-parser
const bosyParser = require("body-parser");

// 引入passport  用于token验证
const passport = require("passport");

// 使用express
const app = express();

// 引入users
const users = require("./routes/api/users");

const profiles = require("./routes/api/profiles");

// Connect to mongodb
const db = require("./config/keys").mongoURL;

// 使用body-parser 中间件
app.use(bosyParser.urlencoded({extended:false}));
app.use(bosyParser.json());



// 连接数据库
mongoose.connect(db)
.then(()=>{
    console.log("MongoDB is Success");
})
.catch((err)=>{
    console.log("fail",err);
})

// passport初始化(初始化后才能正常使用)
app.use(passport.initialize());

require("./config/passport")(passport);

// 测试路由
app.get("/",(req,res)=>{
    res.send("Hellow World!!!");    //成功时返回一个字符串hello world
})


// 使用routers
app.use("/api/users",users);
app.use("/api/profiles",profiles)

// 设定端口号
const port = process.env.PORT || 8888;

app.listen(port,()=>{
    console.log(`Server runing on port:${port}`);
})