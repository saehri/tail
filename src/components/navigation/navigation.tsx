'use client';

import {BarChartIcon, ListBulletIcon} from '@radix-ui/react-icons';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {twMerge} from 'tailwind-merge';

type LinkItem = {pathname: string; label: string; icons: React.ReactNode};

const pagesLink: LinkItem[] = [
  {pathname: '/app', label: 'Todo', icons: <ListBulletIcon />},
  {pathname: '/app/statistics', label: 'Statistics', icons: <BarChartIcon />},
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <ul className='flex outline outline-1 outline-border rounded-full p-1'>
        {pagesLink.map((link) => (
          <NavLink
            key={link.label}
            link={link}
            isActive={pathname === link.pathname}
            icons={link.icons}
          />
        ))}
      </ul>
    </nav>
  );
}

type NavLinkProps = {
  link: LinkItem;
  isActive: boolean;
  icons: React.ReactNode;
};

function NavLink(props: NavLinkProps) {
  return (
    <Link href={props.link.pathname}>
      <li
        className={twMerge(
          'p-1 px-4 rounded-full text-sm flex gap-2 items-center',
          props.isActive
            ? 'bg-secondary/70 hover:bg-secondary/90'
            : 'bg-background hover:bg-secondary/40'
        )}
      >
        {props.icons}
        {props.link.label}
      </li>
    </Link>
  );
}
