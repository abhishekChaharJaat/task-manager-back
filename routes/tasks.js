const express = require("express");
const router = express.Router();
const Tasks = require("../models/Tasks");
const fetchUser = require("../middleware/fetchuser");
const { validate } = require("../models/User");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get all tasks using -> GET request..
router.get("/fetchalltasks", fetchUser, async (req, res) => {
  try {
    const notes = await Tasks.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
});

// ROUTE 2 : Add a new task using -> POST request.. "api/tasks/create-task"
router.post(
  "/addtask",
  [
    body("title", "Please enter title").isLength({ min: 1 }),
    body("description", "Enter 5 length des").isLength({ min: 1 }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({ errors: errors.array() });
      }

      let task = new Tasks({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
      });
      const savedTasks = await task.save();
      res.json(savedTasks);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occured");
    }
  }
);

// ROUTE 3 : Update user notes using -> PUT request.. "api/notes/updatenotes"
router.put("/update/:id", fetchUser, async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  try {
    // create a new task object;
    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }
    if (dueDate) {
      newTask.dueDate = dueDate;
    }
    if (status) {
      newTask.status = status;
    }
    // find the task to be updated and update it
    let task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    task = await Tasks.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
});

// ROUTE 4 : Delete user note using -> DELETE request.. "api/notes/deletenotes"

router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let note = await Tasks.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Tasks.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
});

module.exports = router;
