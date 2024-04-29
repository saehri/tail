'use client';

import {useTheme} from 'next-themes';
import {DropdownMenuItem, DropdownMenuSubContent} from '../ui/dropdown-menu';

export default function ThemeChangerDropdownItems() {
  const {setTheme} = useTheme();

  return (
    <DropdownMenuSubContent>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        System
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
