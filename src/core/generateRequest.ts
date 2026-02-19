import { Router } from "express";
import { Model } from "mongoose";

export const generateRequest = (
	type: string,
	router: Router,
	model: Model<any>,
) => {
	switch (type) {
		case "create":
			router.post("/", async (req, res) => {
				const data = await model.create(req.body);
				res.json(data);
			});
			break;

		case "fetchAll":
			router.get("/", async (req, res) => {
				const data = await model.find();
				res.json(data);
			});
			break;

		case "fetchOne":
			router.get("/:id", async (req, res) => {
				const data = await model.findById(req.params.id);
				res.json(data);
			});
			break;

		case "update":
			router.put("/:id", async (req, res) => {
				const data = await model.findByIdAndUpdate(req.params.id, req.body, {
					new: true,
				});
				res.json(data);
			});
			break;

		case "delete":
			router.delete("/:id", async (req, res) => {
				await model.findByIdAndDelete(req.params.id);
				res.json({ message: "Deleted" });
			});
			break;
	}
};
