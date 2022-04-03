import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		dateAdded: { type: Date, default: Date.now },
		contentType: String,
		Finished: { type: Boolean, default: false },
		userId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);



const contentModel = mongoose.model("Content", contentSchema)

export default contentModel