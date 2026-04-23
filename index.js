import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./kambaz/database/index.js";
import UserRoutes from "./kambaz/users/routes.js";
import CourseRoutes from "./kambaz/courses/routes.js";
import ModulesRoutes from "./kambaz/modules/routes.js";
import AssignmentsRoutes from "./kambaz/assignments/routes.js";
import EnrollmentsRoutes from "./kambaz/enrollments/routes.js";
import "dotenv/config";
import session from "express-session";
import QuizRoutes from "./kambaz/quizzes/routes.js";
import AttemptsRoutes from "./kambaz/attempts/routes.js";

const app = express();
const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
EnrollmentsRoutes(app, db);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
QuizRoutes(app);
AttemptsRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4001);
