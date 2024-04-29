import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ThemeChangerDropdownItems from './theme-changer-dropdown-items';

export default function UserAvatarMenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-60'>
        <DropdownMenuLabel className='flex flex-col'>
          <span>Username</span>
          <span className='text-muted-foreground text-[.8rem] font-normal'>
            bahreesaepul1@gmail.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>Ctrl + Shift + P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>Statistics</DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>

            <ThemeChangerDropdownItems />
          </DropdownMenuSub>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>Ctrl+ Alt + S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>Ctrl + Shift + L</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
