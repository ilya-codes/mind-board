import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/Message";
import Link from "next/link";
import Button from "../components/Button";
import { AiOutlineClose } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";
import AppContext from "../components/Context";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;

  const getData = async () => {
    try {
      if (loading) return;
      const collectionRef = collection(db, "posts");
      const q = query(collectionRef, where("user", "==", user?.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="flex flex-col text-gray-600 dark:dark:text-slate-300">
      {user && !posts.length && (
        <div className="my-20 flex justify-center">
          <h2 className="mx-6 text-center text-3xl font-light">
            {isJapanese ? "メッセージがありません" : " No Posts Yet..."}
          </h2>
        </div>
      )}
      {posts.length > 0 && (
        <h1 className="pb-5 text-center text-lg sm:text-left">
          {isJapanese ? "あなたのメッセージ" : "Your Posts"}
        </h1>
      )}

      {posts.map((post) => (
        <Message key={post.id} {...post}>
          <span
            onClick={() => deletePost(post.id)}
            className="absolute top-8 right-8 cursor-pointer text-2xl"
          >
            <AiOutlineClose />
          </span>
          <hr />
          <div className="mt-5 flex content-center justify-between">
            <Link
              className="flex content-center"
              href={{ pathname: `/${post.id}`, query: { ...post } }}
            >
              <button className="text-sm font-bold">
                {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
                {isJapanese
                  ? "コメント"
                  : post.comments?.length === 1
                  ? "comment"
                  : "comments"}
              </button>
            </Link>
            <Link href={{ pathname: "/post", query: post }}>
              <Button>
                <MdEditNote className="mr-1 self-center text-xl" />
                {isJapanese ? "編集" : "Edit"}
              </Button>
            </Link>
          </div>
        </Message>
      ))}
    </div>
  );
};

export default Dashboard;
