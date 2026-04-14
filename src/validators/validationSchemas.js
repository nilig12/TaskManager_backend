import Joi from "joi";
import { passwordRegex } from "../constant.js";

// User validation schemas
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).pattern(passwordRegex).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

// Task validation schemas
export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title cannot be empty",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
  status: Joi.string().valid("pending", "completed").optional().messages({
    "any.only": "Status must be one of: pending, completed",
  }),
  priority: Joi.string().valid("low", "medium", "high").optional().messages({
    "any.only": "Priority must be one of: low, medium, high",
  }),
  dueDate: Joi.date().empty("").required().messages({
    "date.base": "Due date must be a valid date",
    "any.required": "Due date is required",
  }),
}).options({ stripUnknown: true });

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).optional().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title cannot be empty",
    "string.max": "Title cannot exceed 100 characters",
  }),
  description: Joi.string().allow("").max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
  status: Joi.string().valid("pending", "completed").optional().messages({
    "any.only": "Status must be one of: pending, completed",
  }),
  priority: Joi.string().valid("low", "medium", "high").optional().messages({
    "any.only": "Priority must be one of: low, medium, high",
  }),
  dueDate: Joi.date().empty("").required().messages({
    "date.base": "Due date must be a valid date",
    "any.required": "Due date is required",
  }),
}).options({ stripUnknown: true });
