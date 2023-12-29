const mongoose = require("mongoose");

const navSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add the nav name"],
    },
    url: {
      type: String,
      require: [true, "Please add the nav url"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Nav", navSchema);
