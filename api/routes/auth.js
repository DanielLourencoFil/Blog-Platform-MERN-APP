const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
	console.log(req.body);
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
		});
		let user = await newUser.save();
		const { password, ...others } = user._doc;

		res.status(200).json({ msg: "user added to database", payload: others });
	} catch (err) {
		res.status(500).json({ msg: "Something wrong", payload: err });
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	console.log(req.body);
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(400).json({ msg: "Bad credentials!" });

		//if user exist
		const validade = await bcrypt.compare(req.body.password, user.password);

		!validade && res.status(400).json({ msg: "Bad credentials!" });
		//returning user info, but not password
		const { password, ...others } = user._doc;

		res
			.status(200)
			.json({ msg: "User successfully loged in!", payload: others });
	} catch (err) {
		res.status(500).json({ msg: "Something wrong!", payload: err });
	}
});

module.exports = router;
