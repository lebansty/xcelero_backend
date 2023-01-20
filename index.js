const express = require('express');
const mongodb = require('mongodb');
require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const cors =require('cors')
const DB="Xcelero"
const URL=process.env.URL
const app = express();
app.use(express.json());

app.use(cors({
    origin:'*'
}))

app.post('/postimage',async(req,res)=>{
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB)
        await db.collection("images").insertOne(req.body)
        res.json({messege:"Data inserted"})
        await connection.close()
    } catch (error) {
        console.log(error)
    }
})

app.get("/getimages",async(req,res)=>{
try {
    const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        let allImg= await db.collection("images").find({}).toArray();
        res.json({det:allImg});
        await connection.close();
} catch (error) {
    console.log(error);
}
})






app.listen(3001)

