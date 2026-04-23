import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AttemptsDao() {
  const createAttempt = (attempt) => {
    const newAttempt = { ...attempt, _id: uuidv4() };
    return model.create(newAttempt);
  };

  const findAttemptsForQuiz = (quizId, userId) =>
    model.find({ quiz: quizId, user: userId }).sort({ submittedAt: -1 });

  const countAttempts = (quizId, userId) =>
    model.countDocuments({ quiz: quizId, user: userId });

  return {
    createAttempt,
    findAttemptsForQuiz,
    countAttempts,
  };
}
