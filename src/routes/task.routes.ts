import { Router } from "express";
import { tasks, task } from "../data/tasks";

export const tasksRouter = Router();

tasksRouter.get("/", (req, res) => {
  return res.json(tasks);
});

tasksRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada!" });
  }

  return res.json(task);
});

tasksRouter.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  const newTask: task = {
    id: tasks.length + 1,
    title,
    description,
    isCompleted: false,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

tasksRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, isCompleted } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada!" });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title ?? tasks[taskIndex].title,
    description: description ?? tasks[taskIndex].description,
    isCompleted: isCompleted ?? tasks[taskIndex].isCompleted,
  };

  tasks[taskIndex] = updatedTask;

  return res.json(updatedTask);
});

tasksRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada!" });
  }

  tasks.splice(taskIndex, 1);

  return res.status(204).send();
});
