import { Router } from "express";
import User from "../models/user.js";
const router = Router();

router.get("/", (_, res) => {
	res.render("registration");
});

router.post("/", async (req, res) => {
	const { full_name, email, password, phone, driver_license } = req.body;

	if (!full_name || !email || !password || !phone || !driver_license) {
		return res.status(400).send("Invalid data");
	}

	await User.createInstance({
		id_role: 1,
		full_name,
		email,
		password,
		phone,
		driver_license,
	});

	res.redirect("/");
});

export default router;
