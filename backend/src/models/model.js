const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  checklist: [{ text: String, completed: Boolean }],
  comments: [
    {
      text: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  ],
  dueDate: Date,
  labels: [String],
  assignedUsers: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  ],
  createdBy: {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
  },
})

module.exports = {
  UserModel: mongoose.model("User", userSchema),
  TaskModel: mongoose.model("Task", taskSchema),
}
