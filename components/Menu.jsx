import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useContext } from "react";
import AppContext from "../components/Context";

const Menu = ({ open, handleMenu }) => {
  const [user, loading] = useAuthState(auth);
  const themeContext = useContext(AppContext);
  const darkHandler = themeContext.darkHandler;
  const dark = themeContext.dark;

  const langHandler = themeContext.langHandler;
  const isJapanese = themeContext.isJapanese;

  return (
    <div
      onClick={handleMenu}
      className={` ${
        !open && "hidden"
      } fixed left-0 top-0 min-h-screen w-full bg-gray-900/80`}
    >
      <div className="relative mx-6 md:mx-auto md:max-w-3xl">
        <div
          id="menu"
          className="absolute top-0 right-0 w-full rounded-b-lg bg-white p-8 text-gray-600 shadow-lg dark:bg-slate-700 dark:text-slate-300 sm:w-1/2"
        >
          <div className="flex flex-col text-right">
            <Link
              onClick={handleMenu}
              href="/dashboard"
              id="dashlink"
              className="mb-8 flex w-full justify-end self-end overflow-hidden rounded-3xl border border-gray-400 hover:bg-gray-400 hover:text-white dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span className="my-auto flex-1 text-center">
                {isJapanese ? "ダッシュボード" : "Dashboard"}
              </span>
              <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gray-600">
                <img src={user?.photoURL} alt="" referrerPolicy="no-referrer" />
              </div>
            </Link>
            <div className="flex justify-end gap-8">
              <button
                onClick={darkHandler}
                className={`flex h-10 w-20 self-end justify-${
                  dark ? "end" : "start"
                } items-center self-center overflow-hidden rounded-3xl border border-gray-400 hover:bg-gray-400`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                  {dark ? (
                    <BsMoonStarsFill className="text-yellow-300" />
                  ) : (
                    <BsFillSunFill className="text-lg text-yellow-300" />
                  )}
                </div>
              </button>
              <button
                onClick={langHandler}
                className={`flex h-10 w-20 self-end justify-${
                  isJapanese ? "end" : "start"
                } items-center self-center overflow-hidden rounded-3xl border border-gray-400 hover:bg-gray-400`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 ">
                  <span className="font-medium text-white dark:text-slate-300">
                    {isJapanese ? "Jp" : "Eng"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
