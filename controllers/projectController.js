/** Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers. */
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @desc get all projects
// @route GET /api/projects
// @access private
const getProjects = asyncHandler(async (req, res) => {
  // get all project create by user_id
  const projects = await Project.find({ type: req.params.type });
  res.status(200).json(projects);
});

// @desc create new project
// @route POST /api/projects
// @access private
const createProject = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { type, img, name, info, tech, url = "", repo = "" } = req.body;
  if (!type || !img || !name || !info || !tech) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  // user_id is the user who created this project.
  const project = await Project.create({
    type,
    img,
    name,
    info,
    tech,
    url,
    repo,
  });
  res.status(201).json(project);
});

// @desc get project
// @route GET /api/projects/:id
// @access private
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.status(200).json(project);
});

// @desc update project
// @route PUT /api/projects/:id
// @access private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProject);
});

// @desc delete project
// @route DELETE /api/projects/:id
// @access private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  // const deletedProject = await Project.findByIdAndDelete(req.params.id);
  await Project.deleteOne({ _id: req.params.id });
  res.status(200).json(project);
});

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
};
