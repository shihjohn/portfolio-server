const asyncHandler = require("express-async-handler");
const Content = require("../models/contentModel");

// @desc get content data
// @route GET /api/content
// @access public
const getContents = asyncHandler(async (req, res) => {
  // res.send("Hello World");
  const content = await Content.find();
  res.status(200).json(content);
});

// @desc create content data
// @route POST /api/contents
// @access public
const createContent = asyncHandler(async (req, res) => {
  const { title, img, meta = "", contents } = req.body;
  if (!title || !contents) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  const isFound = await Content.findOne({ title });
  if (isFound) {
    res.status(400);
    throw new Error("Content already exists");
  }
  const content = await Content.create({
    title,
    img,
    meta,
    contents,
  });
  res.status(200).json(content);
});

// @desc get content data
// @route GET /api/contents/:title
// @access public
const getContent = asyncHandler(async (req, res) => {
  // res.send("Hello World");
  const content = await Content.findOne({ title: req.params.title });
  res.status(200).json(content);
});

// @desc update content data
// @route PUT /api/contents/:title
// @access public
const updateContent = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ title: req.params.title });
  if (!content) {
    req.status(404);
    throw new Error("Content data not found");
  }
  const updateContent = await Content.findOneAndUpdate(
    { title: req.params.title },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContent);
});

module.exports = { getContents, getContent, createContent, updateContent };
