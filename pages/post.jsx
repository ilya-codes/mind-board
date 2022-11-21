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

    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async () => {
    try {
      if (loading) return;
      if (routeData.id) {
        setPost({ description: routeData.description, id: routeData.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user, loading]);

  return (
    <div className="my-8 mx-auto max-w-md rounded-lg border border-gray-400 bg-white p-8 text-gray-600 shadow-md dark:border-gray-600 dark:bg-slate-800 dark:text-slate-300 sm:my-20">
      <form onSubmit={submitPost}>
        <h1 className="text-xl font-light">
          {post.hasOwnProperty("id")
            ? `${isJapanese ? "メッセージ編集" : "Edit your post"}`
            : `${isJapanese ? "メッセージを送信" : "Create a new post"}`}
        </h1>
        <div className="py-2">
          <h3 className="py-3 font-light">
            {isJapanese ? "説明" : "Description"}
          </h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="h-48 w-full resize-none rounded-lg bg-gray-700 p-2 text-sm text-white outline-none dark:border dark:border-gray-600 dark:bg-gray-900"
          ></textarea>
          <p
            className={`py-3 text-sm font-medium ${
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
