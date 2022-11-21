import { useContext } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkModeContext from "./Context";

const Layout = ({ children }) => {
  const context = useContext(DarkModeContext);
  const dark = context.dark;

  return (
    <div className={`${dark && "dark"}`}>
      <div className="bg-slate-100 dark:bg-gray-900 w-full min-h-screen transition-all ease-in-out">
        <div className="relative mx-6 min-h-screen md:max-w-2xl md:mx-auto font-poppins">
          <Nav />
          <main className="pb-20">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
