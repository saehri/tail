'use client';

import {selectSearchKeywords, setSearchKeyword} from '@/redux/todos/todo-slice';
import {useAppDispatch, useAppSelector} from '@/redux/utils';

import {Input} from '@/components/ui/input';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const searchKeywords = useAppSelector(selectSearchKeywords);

  function handleChange(e: any) {
    dispatch(setSearchKeyword(e.target.value));
  }

  return (
    <Input
      onChange={handleChange}
      type='text'
      placeholder='Filter tasks...'
      className='w-60'
      value={searchKeywords}
    />
  );
}
