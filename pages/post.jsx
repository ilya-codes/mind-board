import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../components/Button";
import AppContext from "../components/Context";

const Post = () => {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;

  const submitPost = async (e) => {
    e.preventDefault();

    if (!post.description) {
      toast.error("Description Field Empty", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post.description > 300) {
      toast.error("Description too long", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Post has been made", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-8 p-8 border border-gray-400 dark:border-gray-600 shadow-md rounded-lg max-w-md mx-auto text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800 sm:my-20">
      <form onSubmit={submitPost}>
        <h1 className="text-xl font-light">
          {post.hasOwnProperty("id")
            ? `${isJapanese ? "メッセージ編集" : "Edit your post"}`
            : `${isJapanese ? "メッセージを送信" : "Create a new post"}`}
        </h1>
        <div className="py-2">
          <h3 className="font-light py-3">
            {isJapanese ? "説明" : "Description"}
          </h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className=" bg-gray-700 dark:bg-gray-900 dark:border dark:border-gray-600 h-48 w-full resize-none text-white rounded-lg p-2 text-sm outline-none"
          ></textarea>
          <p
            className={`font-medium text-sm py-3 ${
              post.description.length > 300 && "text-red-600"
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <Button type="submit" full>
          {isJapanese ? "送信" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Post;
