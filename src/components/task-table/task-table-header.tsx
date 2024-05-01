export default function TaskTableHeader() {
  return (
    <div className='bg-background hover:bg-secondary/70 text-xs text-muted-foreground border border-border p-2 rounded-tl-md rounded-tr-md grid grid-cols-[51%,_10%,_10%,_13%,_10%]'>
      <span className='block w-ful'>Title</span>
      <span className='block w-ful'>Type</span>
      <span className='block w-ful'>Status</span>
      <span className='block w-ful'>Due date</span>
      <span className='block w-ful'>Priority</span>
    </div>
  );
}
