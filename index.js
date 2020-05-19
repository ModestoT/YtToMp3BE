require("dotenv").config();

const express = require("express");
const app = express();
const horizon = require("horizon-youtube-mp3");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.get("/convert", (req, res) => {
	console.log(typeof req.query.s);

	horizon.getInfo(req.query.s, (err, data) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.send(data);
		}
	});
	// horizon.download(req.query.s, res, null, null, null, false, (err, e) => {
	// 	if (err) {
	// 		console.log(err);
	// 		res.send(err);
	// 	}

	// 	if (e === horizon.successType.CONVERSION_FILE_COMPLETE) {
	// 		console.log(e);
	// 	}
	// });
});

app.listen(PORT, function () {
	console.log(`Server listening on port ${PORT}`);
});
