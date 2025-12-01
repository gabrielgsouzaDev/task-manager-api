import express from "express";
import { tasksRouter } from "./routes/task.routes";

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
