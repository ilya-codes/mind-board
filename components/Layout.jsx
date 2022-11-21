import { useContext } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkModeContext from "./Context";

const Layout = ({ children }) => {
  const context = useContext(DarkModeContext);
  const dark = context.dark;

  return (
    <div className={`${dark && "dark"}`}>
      <div className="min-h-screen w-full bg-slate-100 transition-all ease-in-out dark:bg-gray-900">
        <div className="font-poppins relative mx-6 min-h-screen md:mx-auto md:max-w-2xl">
          <Nav />
          <main className="pb-20">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
