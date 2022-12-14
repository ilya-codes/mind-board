import Head from "next/head";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Message from "../components/Message";
import { auth, db } from "../utils/firebase";
import AppContext from "../components/Context";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;

  const getPosts = async () => {
    try {
      const collectionRef = collection(db, "posts");
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAllPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading)
    return (
      <div className="fixed top-0 left-0 -z-10 flex min-h-screen w-full flex-col justify-center text-center">
        <h2 className="mx-6 text-3xl font-light text-gray-600">
          {isJapanese ? "読み込み中" : "Loading..."}
        </h2>
      </div>
    );

  return (
    <div>
      <Head>
        <title>MindBoard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col text-gray-600 dark:dark:text-slate-300">
        {!user ? (
          <div className="grid grid-cols-1 grid-rows-3 gap-5 text-center font-light sm:mt-20 sm:grid-cols-2 sm:grid-rows-2 sm:gap-20">
            <div className="flex flex-col justify-between rounded-lg border border-gray-400 bg-white p-5 shadow-lg dark:border-gray-600 dark:bg-slate-800 sm:col-span-2">
              <h2 className="bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text pb-3 text-3xl font-medium text-transparent dark:from-slate-300 dark:to-slate-600">
                {isJapanese ? "考えを共有しよう" : "Share Your Thoughts"}
              </h2>
              <p className="dark:text-slate-300">
                {isJapanese
                  ? "誰でも見えるメッセージを送信する。"
                  : "Post messages anyone can see."}
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-gray-400 bg-white p-5 shadow-lg dark:border-gray-600 dark:bg-slate-800">
              <h3 className="bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text pb-3 text-2xl font-medium text-transparent dark:from-slate-300 dark:to-slate-600">
                {isJapanese ? "読めるもコメントもできる" : "Read And Comment"}
              </h3>
              <p className="dark:text-slate-300">
                {isJapanese
                  ? "好きなメッセジーにコメントする"
                  : "Comment posts you like."}
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-gray-400 bg-white p-5 shadow-lg dark:border-gray-600 dark:bg-slate-800">
              <h3 className="bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text pb-3 text-2xl font-medium text-transparent dark:from-slate-300 dark:to-slate-600">
                {isJapanese ? "編集も消去も" : "Edit And Delete"}
              </h3>
              <p className="dark:text-slate-300">
                {isJapanese
                  ? "ダッシュボードを使用して、メッセージを編集および削除する。"
                  : "Use Dashboard to edit and delete your messages."}
              </p>
            </div>
          </div>
        ) : (
          !allPosts.length && (
            <div className="my-20 flex flex-col justify-center">
              <h2 className="mx-6 text-center text-3xl font-light">
                {isJapanese ? "メッセージがありません" : " No Posts Yet..."}
              </h2>
            </div>
          )
        )}
        {user && allPosts.length > 0 && (
          <h1 className="pb-5 text-center text-lg sm:text-left">
            {isJapanese ? "最新のメッセージ" : "Latest Posts"}
          </h1>
        )}
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <hr className="border-gray-400 dark:border-gray-600" />
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button className="mt-4 text-sm font-bold">
                {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
                {isJapanese
                  ? "コメント"
                  : post.comments?.length === 1
                  ? "comment"
                  : "comments"}
              </button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
