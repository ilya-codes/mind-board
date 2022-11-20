import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
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
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;

  const getData = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="flex flex-col text-gray-600 dark:dark:text-slate-300">
      {user && !posts.length && (
        <div className="flex justify-center my-20">
          <h2 className="text-3xl text-center font-light mx-6">
            {isJapanese ? "メッセージがありません" : " No Posts Yet..."}
          </h2>
        </div>
      )}
      {posts.length > 0 && (
        <h1 className="pb-5 text-lg text-center sm:text-left">
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
          <div className="flex mt-5 justify-between content-center">
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
                <MdEditNote className="self-center text-xl mr-1" />
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
