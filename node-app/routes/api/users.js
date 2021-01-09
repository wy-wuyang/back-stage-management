// @login & register

const express = require("express");
const router = express.Router();
// bcrypt 用于加密
const bcrypt = require("bcrypt");
// 用于token的返回
const jwt = require("jsonwebtoken");
// gravatar 头像插件
const gravatar = require("gravatar");

const Keys = require("../../config/keys");

const passport = require("passport");

const User = require("../../models/User");
const { deleteOne } = require("../../models/User");

/**
 * $route  GET api/users/test
 * @desc 返回请求的的json数据
 * @access public
 */
router.get("/test",(req,res)=>{
    res.json({
        msg:"login works"
    })
})


/**
 * $route  GET api/users/register
 * @desc 返回请求的的json数据   注册
 * @access public
 */
router.post("/register",(req,res)=>{
    console.log(req.body);
    User.findOne({email:req.body.email}).then(user=>{
      if(user){
          return res.status(400).json("邮箱已被注册!")
      }else{
        var avater = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

          const newUser = new User({
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              identity:req.body.identity,
              avater,//头像
          })

          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt,(err, hash)=>{
                // Store hash in your password DB.
                if(err) throw err;
                newUser.password = hash;

                newUser.save().then(user=> res.json(user)).catch(err=>console.log(err))
            });
        });
      }
    })
})

/**
 * $route  POST api/users/login
 * @desc 返回token jwt passport     登录
 * @access public
 */
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    // 查询数据库
    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json("用户不存在!");
        }
        // 密码匹配
        bcrypt.compare(password, user.password).then(isMatch=>{
            if(isMatch){
                const rule = {
                    id:user.id,
                    name:user.name,
                    avater:user.avater,
                    identity:user.identity,
                }
                // jwt.sign("规则","加密名字","token过期时间","箭头函数");
                jwt.sign(rule,Keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    res.json({
                        success:true,
                        token:"Bearer " + token
                    })
                })
                // res.json({msg:"success"})
            }else{
                return res.status(400).json("密码错误!")
            }
        })
    })
})


/**
 * $route  GET api/users/current
 * @desc return current user
 * @access Private
 *  
 *  get("路由","验证token方式","箭头函数")
 * 
 */
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity,
    });
})


/**
 * $route GET api/users/userinfo
 * @desc 获取所有用户信息
 * @access Private
 */
router.get("/userinfo",(req,res)=>{
    User.find().then(user=>{
        if(!user){
            return res.status(404).json("没有任何内容")
        }
        res.json(user);
    }).catch(err=>{
        res.status(404).json(err)
    })
})



module.exports = router;