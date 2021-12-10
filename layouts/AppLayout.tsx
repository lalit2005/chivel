import Navbar from "components/common/Navbar";
import { LayoutProps } from "../utils/types";

const AppLayout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen text-white bg-black'>
      <Navbar />
      <main className='max-w-4xl mx-auto'>{children}</main>
    </div>
  );
};

export default AppLayout;
