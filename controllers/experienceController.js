const asyncHandler = require("express-async-handler");
const Experience = require("../models/experienceModel");

// @desc get experience data
// @route GET /api/experiences
// @access public
const getExperiences = asyncHandler(async (req, res) => {
  // res.send("Hello World");
  const experience = await Experience.find().sort({ $natural: -1 });
  res.status(200).json(experience);
});

// @desc create experience data
// @route POST /api/experiences
// @access public
const createExperience = asyncHandler(async (req, res) => {
  const { title, company, date, info } = req.body;
  if (!title || !company || !date || !info) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  const experience = await Experience.create({
    title,
    company,
    date,
    info,
  });
  res.status(200).json(experience);
});

// @desc update experience data
// @route PUT /api/experiences/:id
// @access public
const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    req.status(404);
    throw new Error("Experience data not found");
  }
  const updateExperience = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateExperience);
});

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
};
