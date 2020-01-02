const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => {
		console.log("Connected To DB SuccessFully...");
	})
	.catch(err => console.log(err.message));

//Now we write database schema

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
});

//Now we create the class Course

async function createCourse() {
	const Course = mongoose.model("course", courseSchema);
	const course = new Course({
		name: "Angular Course",
		author: "Muskan",
		tags: ["Angular", "frontend"],
		isPublished: true
	});

	const result = await course.save();
	console.log(result);
}
createCourse();

//Get Data from Database
