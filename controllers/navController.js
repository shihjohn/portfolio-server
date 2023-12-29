const asyncHandler = require("express-async-handler");
const Nav = require("./../models/navModel");

// @desc get nav
// @route GET /api/nav
// @access public
const getNav = asyncHandler(async (req, res) => {
  const nav = await Nav.find();
  res.status(200).json(nav);
});

// @desc create nav
// @route POST /api/nav
// @access public
const createNav = asyncHandler(async (req, res) => {
  const { name, url } = req.body;
  if (!name || !url) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  const nav = await Nav.create({
    name,
    url,
  });
  res.status(200).json(nav);
});

// @desc update nav
// @route POST /api/nav/:id
// @access public
const updateNav = asyncHandler(async (req, res) => {
  const nav = await Nav.findById(req.params.id);
  if (!nav) {
    req.status(404);
    throw new Error("Nav data not found");
  }
  const updateNav = await Nav.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateNav);
});

// @desc delete nav
// @route DELETE /api/nav/:id
// @access public
const deleteNav = asyncHandler(async (req, res) => {
  const nav = await Nav.findByIdAndDelete(req.params.id);
  if (!nav) {
    res.status(404);
    throw new Error("nav not found");
  }
  res.status(200).json(nav);
});

module.exports = { getNav, createNav, updateNav, deleteNav };
