const express = require("express")
const { UserModel, TaskModel } = require("../models/model.js")
const middleware = require("../middlewares/middleware.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post("/loginuser", async (req, res) => {
  try {
    console.log("login", req.body)
    const user = await UserModel.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
      return res.json({ msg: "Authentication failed" })
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    )
    console.log("isPass", isPasswordMatch)
    if (!isPasswordMatch) {
      return res.json({ msg: "Authentication failed" })
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
      expiresIn: "1d",
    })

    res.json({ token, name: user.name })
  } catch (error) {
    res.json({ msg: error.message })
  }
})

router.post("/registeruser", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await UserModel.findOne({ email })
    console.log(existingUser)

    if (existingUser) {
      return res.json({ error: "Email already in use" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    const token = jwt.sign({ userId: newUser._id }, "123456", {
      expiresIn: "1d",
    })
    res.json({ token, name: newUser.name })
  } catch (error) {
    res.json({ error: error.message })
  }
})

router.get("/allusers", async (req, res) => {
  try {
    const allusers = await UserModel.find()
    res.status(200).json(allusers)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/createtask", middleware, async (req, res) => {
  try {
    const { name, description, checklist, dueDate, labels, creatorName } =
      req.body
    const creatorUserId = req.userId
    const createdBy = {
      author: creatorUserId,
      name: creatorName,
    }
    const newTask = new TaskModel({
      name,
      description,
      checklist,
      comments: [],
      dueDate,
      labels,
      assignedUsers: [],
      createdBy,
    })
    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/tasks/comment/:id", middleware, async (req, res) => {
  try {
    const { text, name } = req.body
    const { id } = req.params
    const userId = req.userId

    const task = await TaskModel.findById(id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    if (
      !task.assignedUsers.some((user) => user.author.equals(userId)) &&
      !task.createdBy.author.equals(userId)
    ) {
      return res.status(403).json({
        error: "User is not assigned to this task and not the creator",
      })
    }
    const newComment = {
      text,
      author: userId,
      name,
    }
    task.comments.push(newComment)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/tasks/adduser/:id", middleware, async (req, res) => {
  try {
    const { userIdToAdd, userName } = req.body
    const { id } = req.params
    const userId = req.userId
    const task = await TaskModel.findById(id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    if (
      !task.assignedUsers.some((user) => user.author.equals(userId)) &&
      !task.createdBy.author.equals(userId)
    ) {
      return res.status(403).json({
        error: "User is not assigned to this task and not the creator",
      })
    }

    if (task.assignedUsers.some((user) => user.author.equals(userIdToAdd))) {
      return res
        .status(400)
        .json({ error: "User is already assigned to this task" })
    }

    const newAssignedUser = {
      author: userIdToAdd,
      name: userName,
    }
    task.assignedUsers.push(newAssignedUser)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/tasks", middleware, async (req, res) => {
  try {
    const userId = req.userId
    const unassignedTasks = await TaskModel.find({
      "createdBy.author": userId,
    })
    res.status(200).json(unassignedTasks)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})



module.exports = router
