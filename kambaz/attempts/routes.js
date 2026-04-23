import AttemptsDao from "./dao.js";
import QuizModel from "../quizzes/model.js";

export default function AttemptsRoutes(app) {
  const dao = AttemptsDao();

  const gradeAttempt = (quiz, answers) => {
    let score = 0;
    for (const a of answers) {
      const q = quiz.questions.find((q) => q._id === a.questionId);
      if (!q) continue;
      if (q.type === "MULTIPLE_CHOICE") {
        const correct = q.choices.find((c) => c.isCorrect);
        if (correct && a.answer === correct.text) score += q.points;
      } else if (q.type === "TRUE_FALSE") {
        if (a.answer === q.correctAnswer) score += q.points;
      } else if (q.type === "FILL_IN_BLANK") {
        const match = q.possibleAnswers.some(
          (pa) => pa.toLowerCase() === String(a.answer).toLowerCase(),
        );
        if (match) score += q.points;
      }
    }
    return score;
  };

  const submitAttempt = async (req, res) => {
    const { quizId } = req.params;
    const { userId, answers } = req.body;
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    if (quiz.multipleAttempts) {
      const count = await dao.countAttempts(quizId, userId);
      if (count >= quiz.howManyAttempts) {
        return res.status(403).json({ error: "No attempts remaining" });
      }
    } else {
      const count = await dao.countAttempts(quizId, userId);
      if (count >= 1) {
        return res.status(403).json({ error: "No attempts remaining" });
      }
    }

    const score = gradeAttempt(quiz, answers);
    const attempt = await dao.createAttempt({
      quiz: quizId,
      user: userId,
      answers,
      score,
    });
    res.json(attempt);
  };

  const getAttempts = async (req, res) => {
    const { quizId, userId } = req.params;
    const attempts = await dao.findAttemptsForQuiz(quizId, userId);
    res.json(attempts);
  };

  app.post("/api/quizzes/:quizId/attempts", submitAttempt);
  app.get("/api/quizzes/:quizId/attempts/:userId", getAttempts);
}
