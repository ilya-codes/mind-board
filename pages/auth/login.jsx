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
    <div className=" border border-gray-400 dark:border-gray-600 shadow-md mt-10 sm:mt-32 p-10 bg-white text-gray-600 dark:text-slate-300 dark:bg-slate-800 rounded-lg">
      <h2 className="text-2xl font-medium">
        {isJapanese ? "今すぐ参加" : "Join Now"}
      </h2>
      <div className="py-4 flex flex-col gap-3">
        <h3 className="py-2">
          {isJapanese ? "SNSアカウントでログイン" : "Choose sign in method"}
        </h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-600 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          {isJapanese ? "Google で続ける" : "Sign in with Google"}
        </button>
        <button
          onClick={GithubLogin}
          className="text-white bg-gray-600 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FaGithub className="text-2xl" />
          {isJapanese ? "Github で続ける" : "Sign in with Github"}
        </button>
      </div>
    </div>
  );
}

export default Login;
