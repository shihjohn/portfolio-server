const express = require("express");
const router = express.Router();
const {
  getContents,
  getContent,
  createContent,
  updateContent,
} = require("../controllers/contentController");

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "get all data" });
// });
router.route("/").get(getContents);
router.route("/").post(createContent);

router.route("/:title").get(getContent);
router.route("/:title").put(updateContent);

module.exports = router;
