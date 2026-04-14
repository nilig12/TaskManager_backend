import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/validationSchemas.js";
import { Task } from "../models/taskModel.js";

const createTask = async (req, res) => {
  try {
    // Validate input using Joi
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { title, description, status, priority, dueDate } = value;

    //create task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created SuccessFully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Cannot create Task ",
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    if (!task) {
      return res.status(404).json({
        success: true,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks fetched SuccessFully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "can't fetched Task ",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate("user", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task fetched SuccessFully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Cannot create Task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input using Joi
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { title, description, status, priority, dueDate } = value;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // //check authorization first
    if (task.user.toString() !== req.user._id.toString()) {
      console.log("Task User:", task.user.toString());
      console.log("Logged-in User:", req.user._id.toString());

      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    //update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated SuccessFully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not found",
      });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Task Deleted successFully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while deleting the task",
    });
  }
};

export { createTask, getAllTask, getTaskById, updateTask, deleteTask };
