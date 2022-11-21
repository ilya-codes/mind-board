import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import AppContext from "../../components/Context";
import { useContext } from "react";

function Login() {
  const route = useRouter();

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const githubProvider = new GithubAuthProvider();
  const GithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      route.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;

  return (
    <div className=" mt-10 rounded-lg border border-gray-400 bg-white p-10 text-gray-600 shadow-md dark:border-gray-600 dark:bg-slate-800 dark:text-slate-300 sm:mt-32">
      <h2 className="text-2xl font-medium">
        {isJapanese ? "今すぐ参加" : "Join Now"}
      </h2>
      <div className="flex flex-col gap-3 py-4">
        <h3 className="py-2">
          {isJapanese ? "SNSアカウントでログイン" : "Choose sign in method"}
        </h3>
        <button
          onClick={GoogleLogin}
          className="flex w-full gap-2 rounded-lg bg-gray-600 p-4 align-middle font-medium text-white"
        >
          <FcGoogle className="text-2xl" />
          {isJapanese ? "Google で続ける" : "Sign in with Google"}
        </button>
        <button
          onClick={GithubLogin}
          className="flex w-full gap-2 rounded-lg bg-gray-600 p-4 align-middle font-medium text-white"
        >
          <FaGithub className="text-2xl" />
          {isJapanese ? "Github で続ける" : "Sign in with Github"}
        </button>
      </div>
    </div>
  );
}

export default Login;
