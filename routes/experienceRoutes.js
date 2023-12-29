const express = require("express");
const router = express.Router();
const {
  getExperiences,
  createExperience,
  updateExperience,
} = require("../controllers/experienceController");

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "get all data" });
// });
router.route("/").get(getExperiences);
router.route("/").post(createExperience);

router.route("/:id").put(updateExperience);

module.exports = router;
