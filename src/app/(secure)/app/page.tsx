import {Input} from '@/components/ui/input';

import TableColumnView from '@/components/table-collumn-view/table-column-view';
import ButtonFilterStatus from '@/components/button-filter-status/button-filter-status';
import ButtonFilterPriority from '@/components/button-filter-priority/button-filter-priority';
import ButtonFilterType from '@/components/button-filter-type/button-filter-type';
import TaskTable from '@/components/task-table/task-table';

export default function AppHome() {
  return (
    <>
      <section className='max-w-screen-xl mx-auto mt-6 px-4 flex gap-8 justify-between mb-4'>
        <div className='flex gap-2'>
          <Input type='text' placeholder='Filter tasks...' className='w-60' />

          <ButtonFilterStatus />
          <ButtonFilterPriority />
          <ButtonFilterType />
        </div>

        <TableColumnView />
      </section>

      <section className='max-w-screen-xl mx-auto px-4'>
        <TaskTable />
      </section>
    </>
  );
}
