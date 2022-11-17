import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "./Button";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const Nav = () => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const singOutClear = () => {
    route.push("/auth/login");
    auth.signOut();
  };

  if (loading) return;

  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between pt-10 pb-5 gap-8 mb-8 -mx-1 sticky -top-20 sm:-top-5 z-10 bg-slate-100">
      <Link
        href="/"
        className="flex gap-3 self-center border-b-2 border-b-gray-600"
      >
        <FaPencilAlt className="text-gray-600 self-center text-lg" />
        <h1 className="text-3xl sm:text-2xl font-medium text-gray-600 font-mono">
          MindBoard
        </h1>
      </Link>
      <ul className="flex self-center items-center gap-10">
        {!user && (
          <Link href="/auth/login">
            <Button>Sign In</Button>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/post">
              <Button>Post a message</Button>
            </Link>
            <Button onClick={singOutClear}>Sign Out</Button>
            <Link href="/dashboard">
              <div className="w-10 h-10 bg-gray-600  rounded-full cursor-pointer overflow-hidden">
                <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              </div>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;