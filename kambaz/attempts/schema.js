import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  answer: mongoose.Schema.Types.Mixed,
}, { _id: false });

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: String,
    user: String,
    answers: [answerSchema],
    score: Number,
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "attempts" },
);

export default attemptSchema;
