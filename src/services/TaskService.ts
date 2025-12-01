import { ITask } from "../interfaces/ITask";

export class TaskService {
  private tasks: ITask[] = [
    {
      id: 1,
      title: "Primeira tarefa",
      description: "Exemplo inicial",
      isCompleted: false,
    },
  ];

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new Error("NOT_FOUND");
    }

    return task;
  }

  create(data: Omit<ITask, "id">) {
    const newTask: ITask = {
      id: this.tasks.length + 1,
      ...data,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, data: Partial<Omit<ITask, "id">>) {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error("NOT_FOUND");
    }

    const updated = {
      ...this.tasks[index],
      ...data,
    };

    this.tasks[index] = updated;

    return updated;
  }

  delete(id: number) {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error("NOT_FOUND");
    }

    this.tasks.splice(index, 1);
  }
}

export const taskService = new TaskService();
