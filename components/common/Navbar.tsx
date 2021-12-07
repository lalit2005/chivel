import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-w-4xl px-5 py-4 mx-auto text-gray-300 sm:px-0">
      <Link href="/">
        <a>
          <p className="text-2xl font-bold text-white select-none font-cal">
            CHIVEL
          </p>
        </a>
      </Link>
      <ul className="flex items-center justify-between space-x-10">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Showcase</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Support</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
