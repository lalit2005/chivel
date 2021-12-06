import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between max-w-4xl px-5 py-4 mx-auto text-gray-300 sm:px-0'>
      <p className='text-2xl font-bold text-white font-cal'>CHIVEL</p>
      <ul className='flex items-center justify-between space-x-10'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/'>Showcase</Link>
        </li>
        <li>
          <Link href='/'>Support</Link>
        </li>

        <li>
          <Link href='/'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
