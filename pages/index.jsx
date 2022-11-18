import Head from "next/head";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Message from "../components/Message";
import { auth, db } from "../utils/firebase";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [user, loading] = useAuthState(auth);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center text-center min-h-screen fixed top-0 left-0 -z-10 w-full">
        <h2 className="text-gray-600 text-3xl font-light mx-6">Loading...</h2>
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
          <div className="flex flex-col justify-center my-20">
            <h2 className="text-3xl font-light mx-6">Share Your Thoughts</h2>
          </div>
        ) : (
          !allPosts.length && (
            <div className="flex flex-col justify-center my-20">
              <h2 className="text-3xl font-light mx-6">No Posts Yet...</h2>
            </div>
          )
        )}
        {user && allPosts.length > 0 && (
          <h1 className="pb-5 text-lg text-center sm:text-left">
            Latest Posts
          </h1>
        )}
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <hr />
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button className="mt-4 text-sm font-bold">
                {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
                {post.comments?.length === 1 ? "comment" : "comments"}
              </button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
