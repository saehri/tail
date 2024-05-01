import {Input} from '@/components/ui/input';

import ButtonFilterStatus from '@/components/button-filter-status/button-filter-status';
import ButtonFilterPriority from '@/components/button-filter-priority/button-filter-priority';
import ButtonFilterType from '@/components/button-filter-type/button-filter-type';
import TaskTable from '@/components/task-table/task-table';
import NewTaskDialog from '@/components/new-task-dialog/new-task-dialog';

export default function AppHome() {
  return (
    <>
      <section className='max-w-screen-lg mx-auto mt-6 px-4 flex gap-8 justify-between mb-4'>
        <div className='flex gap-2'>
          <Input type='text' placeholder='Filter tasks...' className='w-60' />

          <ButtonFilterStatus />
          <ButtonFilterPriority />
          <ButtonFilterType />
        </div>

        <div className='flex gap-2 items-center'>
          <NewTaskDialog />
        </div>
      </section>

      <section className='max-w-screen-lg mx-auto px-4'>
        <TaskTable />
      </section>
    </>
  );
}
