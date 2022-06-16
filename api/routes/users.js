const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDADE

router.put("/:id", async (req, res) => {
	//verify user auth
	console.log(req.params.id);
	console.log(req.body.userId);
	console.log(req.body);
	if (req.body.userId === req.params.id) {
		//verify if password was changed and generate new hash
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPass = await bcrypt.hash(req.body.password, salt);
			req.body.password = hashedPass;
		}
		//update info
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json({ msg: "Updaded user!", payload: updatedUser });
		} catch (err) {
			res.status(404).json({ msg: "Something wrong!", payload: err });
		}
	} else {
		res.status(401).json({ msg: "Can update only your account!" });
	}
});

//DELETE
router.delete("/:id", async (req, res) => {
	//verify user auth
	if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			await Post.deleteMany({ username: user.username });
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json({ msg: "User account has been deleted !" });
		} catch (err) {
			res.status(404).json({ msg: "User was not found!", payload: err });
		}
	} else {
		res.status(401).json({ msg: "Can delete only your account!" });
	}
});

//GET USER

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		const { password, ...others } = user._doc;
		res.status(200).json({ msg: "User found!", payload: others });
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});
module.exports = router;
