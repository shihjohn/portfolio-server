const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    type: {
      type: String,
      require: [true, "Please add type"],
    },
    name: {
      type: String,
      require: [true, "Please add name"],
    },
    img: {
      type: String,
      require: [true, "Please add image"],
    },
    info: {
      type: String,
      require: [true, "Please add info"],
    },
    tech: {
      type: [String],
      require: [true, "Please add tech"],
    },
    url: {
      type: String,
      require: false,
    },
    repo: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("project", projectSchema);
