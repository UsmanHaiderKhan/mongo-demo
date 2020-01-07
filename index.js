const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => {
		console.log("Connected To DB SuccessFully...");
	})
	.catch(err => console.log(err.message));

//Now we write database schema

const courseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: function() {
			return this.isPublished;
		}
	}
});

//Now we create the class Course
const Course = mongoose.model("course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "Android Course", //required Validation
		author: "Huzaifa",
		tags: ["Android", "Mobile"],
		isPublished: true,
		price: 15
	});
	try {
		const result = await course.save();
		console.log(result);
	} catch (err) {
		console.log(err.message);
	}
}
createCourse();

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
// getCourses();

async function updateCourse(id) {
	const course = await Course.findById(id);
	if (!course) {
		console.log("No Course Find At ALl..");
		return;
	}
	course.isPublished = true;
	course.author = "JackJhone";
	const result = await course.save();
	console.log(result);
}
// updateCourse("5e0de8fc029c013d2c52032f");
//Direct Update Method

async function updateCourse(id) {
	const course = await Course.findByIdAndUpdate(
		id,
		{
			$set: {
				author: "Usmankhan",
				isPublished: true
			}
		},
		{ new: true }
	);
	console.log(course);
}
// updateCourse("5e0de8fc029c013d2c52032f");

//Delete the Course by Id

async function deleteCourse(id) {
	// const result = await Course.deleteOne({ _id: id });
	// const result = await Course.deleteMany({ _id: id });
	const result = await Course.findByIdAndDelete(id);

	console.log(result);
}
// deleteCourse("5e0de8fc029c013d2c52032f");
