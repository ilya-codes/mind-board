import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { GrClose } from "react-icons/gr";
import { MdEditNote } from "react-icons/md";

const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
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
    <div className="flex flex-col">
      {user && !posts.length && (
        <div className="flex flex-col justify-center text-center min-h-screen fixed top-0 left-0 -z-10 w-full">
          <h2 className="text-gray-600 text-3xl font-light mx-6">
            No Posts Yet...
          </h2>
        </div>
      )}
      {posts.length > 0 && (
        <h1 className="text-gray-600 pb-5 text-lg text-center sm:text-left">
          Your Posts
        </h1>
      )}

      {posts.map((post) => (
        <Message key={post.id} {...post}>
          <span
            onClick={() => deletePost(post.id)}
            className="absolute top-8 right-8 cursor-pointer text-lg"
          >
            <GrClose />
          </span>
          <div className="flex gap-4 pb-5 justify-end">
            <Link href={{ pathname: "/post", query: post }}>
              <Button>
                <MdEditNote className="self-center text-xl mr-1" /> Edit
              </Button>
            </Link>
          </div>

          <hr />
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
            <button className="mt-4 text-gray-600 text-sm font-bold">
              {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
              {post.comments?.length === 1 ? "comment" : "comments"}
            </button>
          </Link>
        </Message>
      ))}
    </div>
  );
};

export default Dashboard;
