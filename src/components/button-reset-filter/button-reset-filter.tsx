'use client';

import {Cross1Icon} from '@radix-ui/react-icons';
import {Button} from '../ui/button';
import {useAppDispatch, useAppSelector} from '@/redux/utils';
import {
  clearFilterKeywords,
  selectFilterPriority,
  selectFilterStatus,
  selectFilterType,
  selectSearchKeywords,
} from '@/redux/todos/todoSlice';
import {cn} from '@/lib/utils';

export default function ResetFiltersButton() {
  const dispatch = useAppDispatch();

  const filterStatus = useAppSelector(selectFilterStatus);
  const filterPriority = useAppSelector(selectFilterPriority);
  const filterType = useAppSelector(selectFilterType);
  const searchKeywords = useAppSelector(selectSearchKeywords);

  const isFiltering =
    filterStatus.length ||
    filterPriority.length ||
    filterType.length ||
    searchKeywords.length;

  return (
    <Button
      onClick={() => dispatch(clearFilterKeywords(null))}
      size='sm'
      variant='ghost'
      className={cn('flex gap-2 items-center', !isFiltering && 'hidden')}
    >
      Reset <Cross1Icon />
    </Button>
  );
}
