const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

/** Use validate token in all routes - make all private route */
router.use(validateToken);

router.route("/").get(getContacts);
router.route("/").post(createContact);
// router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);
// router.route("/").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
