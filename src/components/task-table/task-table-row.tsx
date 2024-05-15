'use client';

import {useAppSelector} from '@/redux/utils';
import {selectClassSubjects} from '@/redux/user/user-slice';
import {Task} from '@/redux/todos/todo-slice';

import TaskColsTitle from './table-row-primitives/task-cols-title';
import TaskColsTaskType from './table-row-primitives/task-cols-task-type';
import TaskColsStatus from './table-row-primitives/task-cols-status';
import TaskColsDueDate from './table-row-primitives/task-cols-duedate';
import TaskColsPriority from './table-row-primitives/task-cols-priority';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import TaskUpdaterInput from '../task-updater-form/task-updater-input';
import TaskUpdaterSelect from '../task-updater-form/task-updater-select';

import TaskUpdaterDueDate from '../task-updater-form/task-updater-dueDate';
import TaskUpdaterTextArea from '../task-updater-form/task-updater-textArea';
import DeleteTaskModal from '../delete-task-modal/delete-task-modal';
import {selectItems} from './table-row-primitives/select-itmes';
import TaskUpdaterSubtask from '../task-updater-form/task-updater-subtask';

export default function TaskTableRow(props: Task) {
  return (
    <Dialog>
      <DialogTrigger className='w-full p-2 items-center grid grid-cols-[45%,_10%,_10%,_25%,_10%] border border-border border-t-0 tracking-tight bg-background hover:bg-secondary/70 last:rounded-br-md last:rounded-bl-md cursor-default text-sm'>
        <TaskColsTitle title={props.title} subjects={props.subjects} />
        <TaskColsTaskType type={props.type} />
        <TaskColsStatus status={props.status} />
        <TaskColsDueDate dueDate={props.dueDate} />
        <TaskColsPriority priority={props.priority} />
      </DialogTrigger>

      <DialogContent className='max-h-[90%] flex flex-col'>
        <DialogHeader>
          <DialogTitle className='capitalize'>{props.type} Detail</DialogTitle>
          <DialogDescription>
            The changes you made will be saved automatically.
          </DialogDescription>
        </DialogHeader>

        <section className='overflow-y-auto flex-1 custom-scrollbar pr-2 pb-2'>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-[75%,_1fr] gap-2 items-end'>
              <TaskUpdaterInput
                colName='title'
                initialFormValue={props.title}
                label='What to do?'
                taskId={props.id}
              />
              <TaskUpdaterSelect
                label='Task type'
                colName='type'
                initialFormValue={props.type}
                taskId={props.id}
                selectItems={selectItems.taskType}
              />
            </div>

            <div className='grid grid-cols-[_.4fr,_1fr] gap-2'>
              <TaskUpdaterSelect
                label='Task priority'
                colName='priority'
                initialFormValue={props.priority}
                taskId={props.id}
                selectItems={selectItems.taskPriority}
              />

              <TaskUpdaterDueDate
                initialFormValue={props.dueDate}
                taskId={props.id}
              />
            </div>

            <div>
              <TaskUpdaterTextArea
                label='Describe your task'
                taskId={props.id}
                initialFormValue={props.description}
                colName='description'
              />
            </div>

            {props.type === 'task' && (
              <TaskUpdaterSubtask
                taskId={props.id}
                subtaskProgress={props.subtasks_progress}
                subtasks={props.subtasks}
              />
            )}

            <div className='grid grid-cols-2 gap-2'>
              <ClassSubjectsUpdater
                taskId={props.id}
                initialFormValue={props.subjects}
              />

              <TaskUpdaterSelect
                label='Status'
                colName='status'
                initialFormValue={props.status}
                taskId={props.id}
                selectItems={selectItems.taskStatus}
              />
            </div>

            <DeleteTaskModal taskId={props.id} />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

interface ClassSubjectsUpdater {
  taskId: string;
  initialFormValue: string;
}

function ClassSubjectsUpdater(props: ClassSubjectsUpdater) {
  const s = useAppSelector(selectClassSubjects);
  const userClassSubjects = s?.length
    ? s?.map((subject) => ({label: subject, value: subject}))
    : [];
  const classSubjects = [
    ...(userClassSubjects as []),
    {value: '-', label: '-'},
  ];

  return (
    <TaskUpdaterSelect
      label='Subjects'
      colName='subjects'
      initialFormValue={props.initialFormValue}
      taskId={props.taskId}
      selectItems={classSubjects}
      description='If study subjects field is empty it means you need to add it to your profile.'
    />
  );
}
