require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.listen(PORT, function () {
	console.log(`Server listening on port ${PORT}`);
});
