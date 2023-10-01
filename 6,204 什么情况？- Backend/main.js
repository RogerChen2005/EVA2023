const express = require("express");
const axios = require("axios");
const fs = require("fs");
const server = express();

let data = JSON.parse(fs.readFileSync("./db.json"));

function generate_value(code,msg,data){
    return JSON.stringify({
        "code":code,
        "msg":msg,
        "data":data
    });
}

server.use(express.json());

server.get("/ping" ,(req,res,next)=>{
    res.writeHead(200);
    res.end(generate_value(0,"",{"msg":"pong"}));
    next();
})

server.post("/check",(req,res,next)=>{
    if(req.body.source){
        if ( data.list.indexOf(req.body.source)!=-1){
            let time = new Date();
            data.lastUpdate[req.body.source] = time.getTime();
            fs.writeFileSync("./db.json",JSON.stringify(data));
            res.end(generate_value(0,"", { 
                "isChecked": true
            }))
        }
        else {
            res.end(generate_value(100,"Server not authorized", { 
                "isChecked": false
            }));
        }
    }
    else res.end(generate_value(101,"Should have a server name", { 
            "isChecked": false
        }));
    next();
})

function generate_time_string(date){
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

server.post("/status",async (req,res,next)=>{
    if(data.list.indexOf(req.body.server)!=-1){
        let time = new Date(data.lastUpdate[req.body.server]);
        let current = new Date();
        let isDisconnected = false;
        if( current.getTime() - time.getTime() >= 300) isDisconnected = true;
        let hitokoto = await axios.get("https://v1.hitokoto.cn/");
        res.end(generate_value(0,"",{
            "last_time":generate_time_string(time),
            "isDisconnected":isDisconnected,
            "hitokoto":hitokoto.data.hitokoto
        }));
    }
    else res.end(generate_value(100,"Server not found", { }));
    next();
})

server.listen(3000,()=>{
    console.log("server is running at 127.0.0.1:3000");
})