const express = require("express");

const app = express();
const port = 5000;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

//api routes
const authRoute = require("./routes/auth");
const userUpdateRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
//json middleware
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.use("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json({ msg: "File has been uploaded" });
});

app
	.use("/api/auth", authRoute)
	.use("/api/user", userUpdateRoute)
	.use("/api/post", postRoute)
	.use("/api/category", categoryRoute)
	.listen(port, () => console.log(`server is running on port ${port}`));
