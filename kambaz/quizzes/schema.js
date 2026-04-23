import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  type: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
    default: "MULTIPLE_CHOICE",
  },
  points: { type: Number, default: 10 },
  question: String,
  choices: [{ text: String, isCorrect: Boolean }],
  correctAnswer: Boolean,
  possibleAnswers: [String],
}, { _id: false });

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "Unnamed Quiz" },
    description: String,
    course: String,
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Immediately" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: { type: Boolean, default: false },
    questions: [questionSchema],
  },
  { collection: "quizzes" },
);

export { questionSchema };
export default quizSchema;
