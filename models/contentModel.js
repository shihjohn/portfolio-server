const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please add title"],
    },
    img: {
      type: String,
      require: [false],
    },
    meta: {
      type: {},
      require: [false],
    },
    contents: {
      type: {},
      require: [true, "Please add contents"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("content", contentSchema);
