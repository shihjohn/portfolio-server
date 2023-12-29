/** Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers. */
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  // get all contact create by user_id
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc create new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  // user_id is the user who created this contact.
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // Only creator of this contact can update it.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "The user does not have permissions to modify contacts belonging to other users."
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // Only creator of this contact can delete it.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "The user does not have permissions to delete contacts belonging to other users."
    );
  }
  // const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
