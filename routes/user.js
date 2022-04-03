import { Router } from "express";
import bcrypt from "bcrypt"

const router = Router()
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.js"


router.post("/login", async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	});

	if (!user) {
		return { status: "error", error: "Invalid login" };
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);



	if (isPasswordValid) {
		const token = jwt.sign(
			{
				user_id: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET
		);

		return res.json({ status: "ok", user: token });
	} else {
		return res.json({ status: "error", user: false });
	}
});




router.post("/register", async (req, res) => {
	console.log(req.body);



	try {
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		});
		const token = jwt.sign(
			{
				user_id: user._id,
				email: req.body.email,
			},
			process.env.JWT_SECRET
		);

		return res.json({ status: "ok", user: token });
	} catch (err) {
        console.log(err)
		res.status(400).json({ status: "error", error: err });
	}
});


export default router;
