const express = require('express');
const app = express();
app.use(express.json());

let bankData = {};

app.post('/api/axis-bank',async(req:any,res:any)=>{
    const token = req.body.token;
    const userId = req.body.userId;
    const amount = req.body.amount;
    bankData = {
        token,userId,amount
    }
})


app.listen(6200,()=>{
    console.log("Axis-Bank-is-Live!");
})