const express = require("express");
const connection = require("../database");
const router = express.Router();

router.post('/register',(req,res,next)=>{
    let user=req.body;
    var query="insert into user(name,email,password, gender,age) values(?,?,?,?,?)"
    connection.query(query,[user.name,user.email,user.password,user.gender,user.age],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"User registered successfully"});
        }
        else{
            return res.status(500).json(err)

        }
    })
})


router.post('/login',(req,res,next)=>{
    let user=req.body;
    var query=`select * from user where name=? and password=?`
    connection.query(query,[user.name,user.password],(err,results)=>{
        if(!err && results.length>0){
            return res.status(200).json({message:"User logged in successfully",user_id:results[0].user_id});
        }
        else if(results.length<=0){
            query=`select * from admin where name=? and password=?`
            connection.query(query,[user.name,user.password],(err,results)=>{
                if(!err&&results.length>0){
                    return res.status(200).json({message:"Admin logged in successfully",admin_id:results[0].admin_id})
                    
                }
                else{
                    return res.status(404).json({message:"Enter proper username and password"})
                }
            })
            
        }
        else{
            return res.status(500).json(err)

        }
    })
})

module.exports=router;