import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "./Button";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Menu from "./Menu";
import { useContext, useState } from "react";
import AppContext from "../components/Context";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const Nav = () => {
  const [user, loading] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const route = useRouter();

  const singOutClear = () => {
    auth.signOut();
    route.push("/auth/login");
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
    <nav className="flex flex-col sm:flex-row sm:justify-between pt-10 pb-5 gap-8 mb-8 -mx-1 sticky -top-20 sm:-top-5 z-10 bg-slate-100 dark:text-slate-300 dark:bg-gray-900 transition-all delay-50">
      <Link
        href="/"
        className="flex gap-3 self-center border-b-2 border-b-gray-600 dark:border-b-slate-300"
      >
        <FaPencilAlt className="text-gray-600 dark:text-slate-300 self-center text-2xl sm:text-xl" />
        <h1 className="text-3xl sm:text-2xl font-medium font-mono text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-400 dark:from-slate-300 dark:to-slate-600">
          {isJapanese ? "マインドボード" : "MindBoard"}
        </h1>
      </Link>
      <ul className="flex self-center items-center gap-10">
        {!user && (
          <Link href="/auth/login">
            <Button>{isJapanese ? "ログイン" : "Sign In"}</Button>
          </Link>
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
              className="flex self-end justify-end border cursor-pointer border-gray-400 dark:text-slate-300 hover:text-white hover:bg-gray-400 dark:hover:bg-slate-400 rounded-l-lg rounded-r-3xl overflow-hidden"
            >
              <span className="mx-2 self-center">
                {isJapanese ? "メニュー" : "Menu"}
              </span>
              <div className="w-9 h-9 bg-gray-600 rounded-full overflow-hidden">
                <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        )}
      </ul>
      <Menu open={menuOpen} handleMenu={handleMenu} />
      <button
        onClick={darkHandler}
        className={`${
          user && "hidden"
        } absolute top-10 right-5 sm:top-12 sm:right-28 w-10 h-6 flex self-end justify-${
          dark ? "end" : "start"
        } items-center border border-gray-400 rounded-3xl overflow-hidden hover:bg-gray-400 self-center`}
      >
        <div className="w-6 h-6 rounded-full flex justify-center items-center bg-slate-700">
          {dark ? (
            <BsMoonStarsFill className="text-xs text-yellow-300" />
          ) : (
            <BsFillSunFill className="text-xs  text-yellow-300" />
          )}
        </div>
      </button>
    </nav>
  );
};

export default Nav;
