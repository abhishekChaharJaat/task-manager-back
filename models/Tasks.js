const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, default: "TODO" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", TasksSchema);
