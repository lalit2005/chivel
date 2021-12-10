import Logo from 'components/common/Logo';
import ProfileDropdown from 'components/common/ProfileDropdown';
const Navbar = () => {
  return (
    <nav className='flex justify-between container items-center mx-auto px-3 py-4 sm:px-0'>
      <Logo />
      <ProfileDropdown />
    </nav>
  );
};

export default Navbar;
