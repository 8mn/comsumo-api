import { Router } from "express";
import contentModel from "../models/content.js";
import jwt from "jsonwebtoken"

const router = Router()
import dotenv from "dotenv";
dotenv.config();

// Add a new content
router.post("/add", async (req,res) => {

    // const decoded = jwt.verify(token, "secret123");
	// 	console.log(decoded);
	// 	const user_id = decoded.user_id;


    const newContent = new contentModel(req.body)
    try {
        const savedContent = await newContent.save()
        res.status(200).json(savedContent)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Get all contents

router.get("/", async(req,res) => {
    try {
        // console.log(process.env.JWT_SECRET);
        const token = req.headers["x-access-token"];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
		const user_id = decoded.user_id;

        const all = await contentModel.find({ userId: user_id });
        res.status(200).json(all);


        // console.log(token)
        // console.log("token")
    } catch (error) {
        res.status(500).json(error);
    }
})


// Get all contents which are finished
router.get("/finished", async (req, res) => {
	try {
		const all = await contentModel.find({Finished:true});
		res.status(200).json(all);
	} catch (error) {
		res.status(500).json(error);
	}
});


// delete a content
router.delete("/delete/:id", async (req, res) => {
    try {
        await contentModel.deleteOne({_id:req.params.id})
        res.status(200).json("The requested content has been deleted successfully")

    } catch (error) {   
        res.status(500).json(error);
    }
})


// Chnage finished status
router.patch("/update/:id", async(req,res) => {
    try {
        // const content = await contentModel.findById(req.params.id)
        // const updatedContent = await content.updateOne({$set: req.body});
        // res.status(200).json(updatedContent)
        let query = {_id:req.params.id}
        let update = req.body
        console.log(query)
        let options = {new:true}
        contentModel.findOneAndUpdate(query, update, options,(err,doc) => {
            if(err) return res.status(500).json(err);
            res.status(200).json(doc)
        })

    } catch (error) {
        res.status(500).json(err)
    }
})


router.delete("/delete", async(req,res) => {
    try {
        contentModel.deleteMany({}, (err) => {
            if(err) res.status(500).json(err);
            res.status(200).json({"message":"Deletion successfull"});
        })
    } catch (error) {
        
    }
})




export default router