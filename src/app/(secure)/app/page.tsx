import {Button} from '@/components/ui/button';
import {PlusCircledIcon} from '@radix-ui/react-icons';
import {Input} from '@/components/ui/input';
import TableColumnView from '@/components/table-collumn-view/table-column-view';

export default function AppHome() {
  return (
    <>
      <section className='max-w-screen-lg mx-auto mt-6 p-4 flex gap-8 justify-between'>
        <div className='flex gap-2 min-w-[45%]'>
          <Input type='text' placeholder='Filter tasks...' />

          <Button
            variant='ghost'
            className='flex gap-2 outline-1 outline-dashed outline-slate-200'
            size='sm'
          >
            <PlusCircledIcon /> Status
          </Button>
          <Button
            variant='ghost'
            className='flex gap-2 outline-1 outline-dashed outline-slate-200'
            size='sm'
          >
            <PlusCircledIcon /> Priority
          </Button>
        </div>

        <TableColumnView />
      </section>
    </>
  );
}
