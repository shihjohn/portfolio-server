const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.route("/:type").get(getProjects);
router.route("/").post(createProject);
// router.route("/").get(getProjects).post(createProject);

router.route("/:id").get(getProject);
router.route("/:id").put(updateProject);
router.route("/:id").delete(deleteProject);
// router.route("/").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
