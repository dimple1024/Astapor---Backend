const mongoose = require("mongoose");
const taskTypes = [
  "GDD",
  "DL",
  "PL",
  "Daemon/Job",
  "SUM.INI",
  "DBA Changes",
  "CR",
];

let TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    taskType: {
      type: String,
      enum: taskTypes,
      required: true,
    },
    status: ["Pending", "In Progress", "Completed"],
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Task", TaskSchema);
