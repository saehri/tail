'use state';

import {Pencil1Icon} from '@radix-ui/react-icons';

interface FormPlaceholder {
  startEditing: () => void;
  initialFormValue: string;
  label: string;
}

export default function FormPlaceholder(props: FormPlaceholder) {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <span className='font-semibold text-sm'>{props.label}</span>

      <button
        onClick={props.startEditing}
        className='text-left text-sm group relative leading-4 h-9 flex items-center px-2 border border-border border-dashed rounded-md'
      >
        {props.initialFormValue}

        <Pencil1Icon className='absolute top-0 right-0 opacity-0 group-hover:opacity-100' />
      </button>
    </div>
  );
}
