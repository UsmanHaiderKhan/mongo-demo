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
const Course = mongoose.model("course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "Angular Course",
		author: "Muskan",
		tags: ["Angular", "frontend"],
		isPublished: true
	});

	const result = await course.save();
	console.log(result);
}
// createCourse();

//Get Data from Database

async function getCourses() {
	//Comparison Operator in MongoDb
	// eq (equal)
	// ne (Not equal)
	// gt (greater then)
	// gte (greater then equal)
	// ls (Less Then)
	// lse (less then equL)
	// ne (Not equal)
	// nin (not in)

	//Logical Operators
	// or
	// and
	var pageSize = 2;
	var pageNumber = 10;
	const course = await Course.find()
		// .find({ author: /^Nazam/ }) //String start with ^
		// .find({ author: /Khan$/i }) //String Ends with or i make case insensitive
		// .find({ author: /.*Nazam.*/ }) // start with 0 or all Numbers
		.limit(10)
		.skip((pageSize - 2) * pageNumber)
		// .or ([{object},{name:'usman'},{}])
		// .and ([{name:'Arslan'},{},{}])
		.sort({ name: -1 }) //1 ascending Order -1 descending ORder
		// .select({ name: 1, tags: 1 });
		.count();
	console.log(course);
}
getCourses();
