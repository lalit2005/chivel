import Logo from 'components/common/Logo';
import ProfileDropdown from 'components/common/ProfileDropdown';
const Navbar = () => {
  return (
    <nav className='container flex items-center justify-between px-3 py-4 mx-auto sm:px-0'>
      <Logo />
      <ProfileDropdown />
    </nav>
  );
};

export default Navbar;
