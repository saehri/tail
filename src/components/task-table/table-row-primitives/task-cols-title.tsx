'use client';

import {Badge} from '@/components/ui/badge';

interface TaskTitle {
  title: string;
  subjects: string;
}

export default function TaskColsTitle(props: TaskTitle) {
  return (
    <div className='flex gap-2 w-[90%]'>
      {props.subjects !== '-' && (
        <Badge variant='outline' className='capitalize whitespace-nowrap'>
          {props.subjects}
        </Badge>
      )}

      <span className='block whitespace-nowrap overflow-hidden text-ellipsis'>
        {props.title}
      </span>
    </div>
  );
}
