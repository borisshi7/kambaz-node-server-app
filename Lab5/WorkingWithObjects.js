const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: 2,
  name: "Introduction to Rocket Propulsion",
  description:
    "Rocket propulsion is a class of propulsion methods that generates thrust by ejecting mass at high velocity in the opposite direction of desired movement, based on Newton's Third Law of Motion.",
  course: "Rocket Propulsion",
};
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  };
  const setAssignmentCompletion = (req, res) => {
    const { newCompletion } = req.params;
    assignment.completed = newCompletion;
    res.json(assignment);
  };
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:newCompletion", setAssignmentCompletion);

  // On Your Own part - Module
  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module", getModule);

  const setModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };
  app.get("/lab5/module/name/:newName", setModuleName);

  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  };
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
}
