import ButtonFilterStatus from '@/components/button-filter-status/button-filter-status';
import ButtonFilterPriority from '@/components/button-filter-priority/button-filter-priority';
import ButtonFilterType from '@/components/button-filter-type/button-filter-type';
import TaskTable from '@/components/task-table/task-table';
import NewTaskDialog from '@/components/new-task-dialog/new-task-dialog';
import ResetFiltersButton from '@/components/button-reset-filter/button-reset-filter';
import SearchInput from '@/components/search-input/search-input';

export default function AppHome() {
  return (
    <>
      <section className='max-w-screen-lg mx-auto mt-6 px-4 flex gap-8 justify-between mb-4'>
        <div className='flex gap-2'>
          <SearchInput />
          <ButtonFilterStatus />
          <ButtonFilterPriority />
          <ButtonFilterType />
          <ResetFiltersButton />
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
