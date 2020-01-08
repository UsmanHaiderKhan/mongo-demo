const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => {
		console.log("Connected To DB SuccessFully...");
	})
	.catch(err => console.log(err.message));

//Now we write database schema

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255
		// match: /pattern/i
	},
	category: [String],
	// category:{
	// 	enum: ["web","android","networking"],
	// 	required: true,
	// 	type: String,
	// 	lowercase: true,
	// 	uppercase:true,
	// 	trim: true
	// },
	author: String,
	// tags: [String],
	//custom validator
	tags: {
		type: Array,
		validate: {
			isAsync: true,
			validator: function(value, callback) {
				setTimeout(() => {
					const result = value && value.length > 0;
					callback(result);
				}, 4000);
			},
			message: "Course Should Have at Least 1 Tag..."
		}
	},
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: () => {
			return this.isPublished;
		},
		min: 10,
		max: 20,
		get: v => Math.round(v),
		set: v => Math.round(v)
	}
});

//Now we create the class Course
const Course = mongoose.model("Course", courseSchema);

// async function createCourse() {
// 	const course = new Course({
// 		name: "AndroidCourse",
// 		category: ["Android", "backend"], //required Validation
// 		author: "Huzaifa",
// 		tags: ["MobileUi"],
// 		isPublished: true,
// 		price: 15.7
// 	});
// 	try {
// 		const result = await course.save();
// 		console.log(result);
// 	} catch (ex) {
// 		for (field in ex.errors) console.log(ex.errors[field].message);

// 		// console.log(err.message);
// 		return;
// 	}
// }
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
	const courses = await Course.find({ _id: "5e15a5c766efa039f8d67e72" })
		// .find({ author: /^Nazam/ }) //String start with ^
		// .find({ author: /Khan$/i }) //String Ends with or i make case insensitive
		// .find({ author: /.*Nazam.*/ }) // start with 0 or all Numbers
		.limit(10)
		// .skip((pageSize - 2) * pageNumber)
		// .or ([{object},{name:'usman'},{}])
		// .and ([{name:'Arslan'},{},{}])
		.sort({ name: -1 }); //1 ascending Order -1 descending ORder
	// .select({ name: 1, tags: 1 });
	// .count();
	console.log(courses[0].price);
}
getCourses();

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
