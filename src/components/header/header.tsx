import Navigation from '../navigation/navigation';
import LogoAndGreetings from './logo-and-greetings';
import UserAvatarMenuDropdown from './user-avatar-menu-dropdown';

export default function Header() {
  return (
    <header className='flex justify-between relative items-center p-4 max-w-screen-xl mx-auto'>
      <LogoAndGreetings />

      <Navigation />

      <UserAvatarMenuDropdown />
    </header>
  );
}
