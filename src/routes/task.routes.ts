import { Router } from "express";
import { taskService } from "../services/TaskService";

export const tasksRouter = Router();

// GET ALL
tasksRouter.get("/", (req, res) => {
  const tasks = taskService.getAll();
  return res.json(tasks);
});

// GET BY ID
tasksRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  try {
    const task = taskService.getById(id);
    return res.json(task);
  } catch (err) {
    return res.status(404).json({ error: "Task not found" });
  }
});

// CREATE
tasksRouter.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = taskService.create({
    title,
    description,
    isCompleted: false,
  });

  return res.status(201).json(task);
});

// UPDATE
tasksRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, isCompleted } = req.body;

  try {
    const updated = taskService.update(id, {
      title,
      description,
      isCompleted,
    });

    return res.json(updated);
  } catch (err) {
    return res.status(404).json({ error: "Task not found" });
  }
});

// DELETE
tasksRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  try {
    taskService.delete(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(404).json({ error: "Task not found" });
  }
});
