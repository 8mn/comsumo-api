import { Router } from "express";
import contentModel from "../models/content.js";


const router = Router()

// Add a new content
router.post("/add", async (req,res) => {
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
        const all = await contentModel.find({})
        res.status(200).json(all);
    } catch (error) {
        res.status(500).json(error);
    }
})


// Get all contents which are finished
router.get("/finished", async (req, res) => {
	try {
		const all = await contentModel.find({finished:true});
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
        const content = await contentModel.findById(req.params.id)
        await content.updateOne({$set: req.body});
        res.status(200).json("The post has been updated")
    } catch (error) {
        res.status(500).json(err)
    }
})




export default router