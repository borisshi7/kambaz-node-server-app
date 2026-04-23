import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizDao() {
  const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
  };
  const deleteQuiz = (quizId) => {
    return model.deleteOne({ _id: quizId });
  };
  const findQuizForCourse = (courseId) => model.find({ course: courseId });
  const findQuizById = (quizId) => model.findById(quizId);
  const updateQuiz = (quizId, newQuiz) =>
    model.updateOne({ _id: quizId }, { $set: newQuiz });

  return {
    createQuiz,
    deleteQuiz,
    findQuizForCourse,
    findQuizById,
    updateQuiz,
  };
}
