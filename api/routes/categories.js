const router = require("express").Router();
const Category = require("../models/Category");

//CREATE
router.post("/", async (req, res) => {
	const newCategory = await Category(req.body);
	try {
		const savedCategory = await newCategory.save();
		res.status(200).json({ msg: "Category saved", payload: savedCategory });
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});
//GET ALL
router.get("/", async (req, res) => {
	try {
		const allCategories = await Category.find();
		res.status(200).json({ msg: "Categories fetched", payload: allCategories });
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});

module.exports = router;
