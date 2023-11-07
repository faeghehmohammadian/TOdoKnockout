const express = require('express');
const fs= require("fs");
const path = require("path");
const port = 3000;
const bodyParser=require("body-parser");
const server = express();

const mainpath=path.normalize(__dirname + "//..");
server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json())
server.use(express.static(mainpath +"/client"));
server.listen(port, () => {
console.log(`Server running on PORT: ${port}/`);
});

server.get("/",(req,res) =>{
    res.sendFile(mainpath +"/client/index.html")
})
server.get("/download",(req,res)=>{
    fs.readFile(mainpath +"/client/file/data.json",{oncoding: "utf-8"}, (err,data)=>{
        if (err){
            res.send(err);
            return;
        }
        res.send(data);
    })
})

server.post("/upload",(req,res)=>{
    const data=req.body;
    fs.writeFile(mainpath +"/client/file/data.json",JSON.stringify(data ,null ," "),{oncoding: "utf-8"}, (err)=>{
        if (err){
            res.send(err);
            return;
        }
        res.json("succes");
    })
})