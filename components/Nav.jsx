import Link from "next/link";
import Button from "./Button";
import Menu from "./Menu";
import AppContext from "../components/Context";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const Nav = () => {
  const [user, loading] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const route = useRouter();

  const singOutClear = () => {
    try {
      auth.signOut();
      route.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = (e) => {
    if (!e.target.closest("#menu") || e.target.closest("#dashlink")) {
      setMenuOpen(!menuOpen);
    }
  };

  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;
  const darkHandler = themeContext.darkHandler;
  const dark = themeContext.dark;

  if (loading) return;

  return (
    <nav className="delay-50 sticky -top-20 z-10 -mx-1 mb-8 flex flex-col gap-8 bg-slate-100 pt-10 pb-5 transition-all dark:bg-gray-900 dark:text-slate-300 sm:-top-5 sm:flex-row sm:justify-between">
      <Link
        href="/"
        className="flex gap-3 self-center border-b-2 border-b-gray-600 dark:border-b-slate-300"
      >
        <FaPencilAlt className="self-center text-2xl text-gray-600 dark:text-slate-300 sm:text-xl" />
        <h1 className="bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text font-mono text-3xl font-medium text-transparent dark:from-slate-300 dark:to-slate-600 sm:text-2xl">
          {isJapanese ? "マインドボード" : "MindBoard"}
        </h1>
      </Link>
      <ul className="flex items-center gap-10 self-center">
        {!user && (
          <div className="flex sm:flex-row-reverse">
            <Link href="/auth/login">
              <Button>{isJapanese ? "ログイン" : "Sign In"}</Button>
            </Link>
            <button
              onClick={darkHandler}
              className={`ml-8 flex h-6 w-10 sm:ml-0 sm:mr-8 justify-${
                dark ? "end" : "start"
              } items-center self-center overflow-hidden rounded-3xl border border-gray-400 hover:bg-gray-400 `}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700">
                {dark ? (
                  <BsMoonStarsFill className="text-xs text-yellow-300" />
                ) : (
                  <BsFillSunFill className="text-xs  text-yellow-300" />
                )}
              </div>
            </button>
          </div>
        )}
        {user && (
          <div className="flex flex-row flex-wrap items-center gap-3">
            <Link href="/post">
              <Button>{isJapanese ? "メッセージ" : "Post a message"}</Button>
            </Link>
            <Button onClick={singOutClear}>
              {isJapanese ? "ログアウト" : "Sign Out"}
            </Button>

            <div
              onClick={handleMenu}
              className="flex cursor-pointer justify-end self-end overflow-hidden rounded-l-lg rounded-r-3xl border border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white dark:text-slate-300 dark:hover:bg-slate-400"
            >
              <span className="mx-2 self-center ">
                {isJapanese ? "メニュー" : "Menu"}
              </span>
              <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-600">
                <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        )}
      </ul>
      <Menu open={menuOpen} handleMenu={handleMenu} />
    </nav>
  );
};

export default Nav;
