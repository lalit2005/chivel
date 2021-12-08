import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <p className="text-2xl font-bold text-white select-none font-cal">
          CHIVEL
        </p>
      </a>
    </Link>
  );
};

export default Logo;
