import LogoAndGreetings from './logo-and-greetings';
import UserAvatarMenuDropdown from './user-avatar-menu-dropdown';

export default function Header() {
  return (
    <header className='flex justify-between items-center p-4 max-w-screen-xl mx-auto'>
      <LogoAndGreetings />

      <UserAvatarMenuDropdown />
    </header>
  );
}
