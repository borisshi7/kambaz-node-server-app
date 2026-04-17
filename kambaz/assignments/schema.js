import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
	course: String,
	availableFrom: Date,
	dueDate: Date,
	availableFromDate: String,
	dueDateDate: String,
	score: String,
	description: String,
  },
  { collection: "assignments" },
);
export default assignmentSchema;
