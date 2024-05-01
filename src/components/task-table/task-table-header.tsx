export default function TaskTableHeader() {
  return (
    <div className='grid grid-cols-[_1fr,_10%,_10%,_25%,_10%] bg-background hover:bg-secondary/70 text-xs text-muted-foreground border border-border p-2 rounded-tl-md rounded-tr-md'>
      <span className='block w-ful'>Title</span>
      <span className='block w-ful'>Type</span>
      <span className='block w-ful'>Status</span>
      <span className='block w-ful'>Due date</span>
      <span className='block w-ful'>Priority</span>
    </div>
  );
}
