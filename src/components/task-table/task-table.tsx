'use client';

import TaskTableHeader from './task-table-header';
import TaskTableRow from './task-table-row';

type TaskTypeTypes = 'task' | 'quiz';
type TaskStatusTypes = 'todo' | 'ongoing' | 'pending' | 'done';
type TaskPriorityTypes = 'low' | 'medium' | 'high';
type TaskTypes = {
  id: string;
  title: string;
  type: TaskTypeTypes;
  status: TaskStatusTypes;
  dueDate: string;
  priority: TaskPriorityTypes;
  progress: string;
  subjects: string;
};

const dummyTaskData: TaskTypes[] = [
  {
    id: 'TASK-01',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odio, cumque quam commodi veniam placeat!',
    type: 'task',
    priority: 'medium',
    dueDate: '1 May 2024',
    status: 'todo',
    progress: '2/5',
    subjects: 'Software Analysis and Design',
  },
  {
    id: 'TASK-02',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odio, cumque quam commodi veniam placeat!',
    type: 'quiz',
    priority: 'high',
    dueDate: '31 May 2024',
    status: 'ongoing',
    progress: '0/1',
    subjects: 'Machine Learning',
  },
];

export default function TaskTable() {
  return (
    <>
      <TaskTableHeader />

      {dummyTaskData.map((task) => (
        <TaskTableRow {...task} key={task.id} />
      ))}
    </>
  );
}
