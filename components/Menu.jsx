import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "./Button";
import { useRouter } from "next/router";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useContext, useState } from "react";
import AppContext from "../components/Context";

const Menu = ({ open, handleMenu }) => {
  const [user, loading] = useAuthState(auth);

  const route = useRouter();

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
      } bg-gray-900/80 fixed left-0 top-0 min-h-screen w-full`}
    >
      <div className="relative mx-6 md:max-w-3xl md:mx-auto">
        <div
          id="menu"
          className="absolute top-0 right-0 w-full sm:w-1/2 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-300 p-8 shadow-lg rounded-b-lg"
        >
          <div className="flex flex-col text-right">
            <Link
              onClick={handleMenu}
              href="/dashboard"
              id="dashlink"
              className="w-full mb-5 flex self-end justify-end border border-gray-400 dark:text-slate-300 hover:text-white hover:bg-gray-400 dark:hover:bg-slate-800 rounded-3xl overflow-hidden"
            >
              <span className="flex-1 text-center my-auto">
                {isJapanese ? "ダッシュボード" : "Dashboard"}
              </span>
              <div className="w-10 h-10 bg-gray-600 rounded-full cursor-pointer overflow-hidden">
                <img src={user?.photoURL} alt="" referrerPolicy="no-referrer" />
              </div>
            </Link>
            <button
              onClick={darkHandler}
              className={`w-20 h-10 mb-5 flex self-end justify-${
                dark ? "end" : "start"
              } items-center border border-gray-400 rounded-3xl overflow-hidden hover:bg-gray-400 `}
            >
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-slate-800">
                {dark ? (
                  <BsMoonStarsFill className="text-yellow-300" />
                ) : (
                  <BsFillSunFill className="text-lg text-yellow-300" />
                )}
              </div>
            </button>
            <button
              onClick={langHandler}
              className={`w-20 h-10 flex self-end justify-${
                isJapanese ? "end" : "start"
              } items-center border border-gray-400 rounded-3xl overflow-hidden hover:bg-gray-400`}
            >
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-slate-800 ">
                <span className="font-medium text-white dark:text-slate-300">
                  {isJapanese ? "Jp" : "Eng"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
