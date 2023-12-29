const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please add title"],
    },
    company: {
      type: String,
      require: [true, "Please add company"],
    },
    date: {
      type: String,
      require: [true, "Please add date"],
    },
    info: {
      type: String,
      require: [true, "Please add info"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("experience", experienceSchema);
