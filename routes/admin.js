import { Router } from "express";
import RequestModel from "../models/request.js";
const router = Router();

const formatDate = (dateString) => {
	const options = {
		year: "numeric",
		month: "long",
	};
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString("ru", options);
	return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

router.get("/", async (_, res) => {
	const request = await RequestModel.getRequestData();
	const formattedDate = request.map((item) => ({
		...item,
		booking_data: formatDate(item.booking_date),
	}));

	res.render("admin", {
		formattedDate,
	});
});

export default router;
