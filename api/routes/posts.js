const router = require("express").Router();
const Post = require("../models/Post");
// const User = require("../models/User");

//CREATE
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		// const newPost = await new Post(req.body).save();
		const savedPost = await newPost.save();
		res.status(200).json({ msg: "Post saved", payload: savedPost });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});

//UPDATE
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{ $set: req.body },
					{ new: true }
				);
				res.status(200).json({ msg: "Post updated!", payload: updatedPost });
			} catch (err) {
				res.status(500).json({ msg: "Something went wrong!", payload: err });
			}
		} else {
			res.status(401).json({ msg: "You can update only your posts!" });
		}
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}

	res.status(200).json({ msg: "Post updated!" });
	try {
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});

//GET ALL
router.get("/", async (req, res) => {
	const username = req.query.user;
	const catName = req.query.category;
	try {
		let posts = [];
		if (username) {
			posts = await Post.find({ username });
		} else if (catName) {
			posts = await Post.find({ categories: { $in: [catName] } });
		} else {
			posts = await Post.find();
		}
		if (posts.length === 0) {
			res
				.status(200)
				.json({ msg: "Sorry, no posts on database", payload: posts });
		} else {
			res.status(200).json({ msg: "Fetch all Posts", payload: posts });
		}
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});
//GET SINGLE
router.get("/:id", async (req, res) => {
	try {
		console.log(req.params);
		const post = await Post.findById(req.params.id);
		res.status(200).json({ msg: "success", payload: post });
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});
//DELETE
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				await post.delete();

				res.status(200).json({ msg: "Post has been deleted!" });
			} catch (err) {
				res.status(500).json({ msg: "Something went wrong!", payload: err });
			}
		} else {
			res.status(401).json({ msg: "You can delete only your posts" });
		}
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong!", payload: err });
	}
});

module.exports = router;
