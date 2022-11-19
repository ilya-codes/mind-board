import { useContext } from "react";
import Nav from "./Nav";
import DarkModeContext from "./Context";

const Layout = ({ children }) => {
  const context = useContext(DarkModeContext);
  const dark = context.dark;

  return (
    <div className={`${dark && "dark"}`}>
      <div className="bg-slate-100 dark:bg-gray-900 w-full min-h-screen transition-all ease-in-out">
        <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
          <Nav />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
