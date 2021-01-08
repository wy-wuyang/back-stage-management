const express = require("express");
const router = express.Router();
const passport = require("passport")

const Navigation = require("../../models/Navigation");

// 测试接口
router.get("/test",(req,res)=>{
    res.json({
        msg:"Navigation works"
    })
})

// 增加导航信息
router.post("/add",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const navigationFields = {};

    if(req.body.name) navigationFields.name = req.body.name;
    if(req.body.url) navigationFields.url = req.body.url;
    if(req.body.desc) navigationFields.desc = req.body.desc;
    if(req.body.date) navigationFields.date = req.body.date;
    
    new Navigation(navigationFields).save().then(navigation=>{
        res.json(navigation);
    })
})

// 获取全部导航信息
router.get("/",passport.authenticate('jwt',{session:false}),(req,res)=>{
    Navigation.find().then(navigation=>{
        if(!navigation){
            return res.status(404).json("没有任何内容")
        }
        res.json(navigation);
    }).catch(err=>{
        res.status(404).json(err)
    })
})

// 获取单个导航信息
router.get("/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    Navigation.findOne({_id:req.params.id}).then(navigation=>{
        if(!navigation){
            return res.status(404).json("没有任何内容")
        }
        res.json(navigation);
    }).catch(err=>{
        res.status(404).json(err)
    })
})

// 编辑导航信息
router.post("/edit/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const navigationFields = {};

    if(req.body.name) navigationFields.name = req.body.name;
    if(req.body.url) navigationFields.url = req.body.url;
    if(req.body.desc) navigationFields.desc = req.body.desc;
    if(req.body.date) navigationFields.date = req.body.date;

    Navigation.findOneAndUpdate(
        {_id:req.params.id},
        {$set:navigationFields},
        {new:true}
    ).then(navigation=>res.json(navigation))
})

// 删除导航信息

router.delete("/delete/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    Navigation.findOneAndRemove({_id:req.params.id}).then(navigation=>{
        navigation.save().then(navigation=>res.json(navigation))
    })
    .catch(err=>res.status(404).json("删除失败!"))
})

module.exports = router;