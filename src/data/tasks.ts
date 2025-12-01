export interface task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export const tasks: task[] = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Primeira tarefa atribuída',
        isCompleted: false
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Segunda tarefa atribuída',
        isCompleted: true
    }
];