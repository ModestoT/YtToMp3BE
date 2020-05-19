require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.get("/convert", (req, res) => {
	console.log(req.query.s);
	let stream = ytdl(req.query.s, { filter: "audioonly" });

	let audio = ffmpeg(stream)
		.audioBitrate(128)
		.format("mp3")
		.on("error", (e) => {
			console.log("something went wrong with the dl: ", e);
		})
		.on("progress", (p) => {
			console.log(`${p.targetSize}kb downloaded`);
		})
		.on("end", () => {
			res.send("Finished dling audio!");
		})
		.pipe(fs.createWriteStream("output.mp3"));

	// let ffstream = audio.pipe();
	// ffstream.on("data", (chunk) => {
	// 	// res.write(chunk);
	// });
});

app.listen(PORT, function () {
	console.log(`Server listening on port ${PORT}`);
});
