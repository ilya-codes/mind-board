import Message from "../components/Message";
import Button from "../components/Button";
import { BsTextRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import AppContext from "../components/Context";

const Details = () => {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const themeContext = useContext(AppContext);
  const isJapanese = themeContext.isJapanese;

  const sendComment = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return router.push("./auth/login");

    if (!message) {
      toast.error("Message Is Empty!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data()?.comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div>
      <Message {...routeData}></Message>
      <div className="pt-5 text-gray-600 dark:text-slate-300">
        <form onSubmit={sendComment} className="flex pb-5">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder={`${
              isJapanese ? "メッセージを送る" : "Send a message"
            }`}
            className=" w-full rounded-lg rounded-r-none bg-gray-600 px-4 py-2 text-white outline-none dark:border dark:border-r-0 dark:border-gray-400 dark:bg-gray-900"
          />
          <Button group>
            <BsTextRight className="mr-1 self-center" />
            <span className="w-10 self-center">
              {isJapanese ? "送信" : "Send"}
            </span>
          </Button>
        </form>

        <div className="py-5">
          <h2 className="text-lg">{isJapanese ? "コメント" : "Comments"}</h2>
          <div className="flex flex-col-reverse">
            {allMessages?.map((message) => (
              <div
                className="mt-5 rounded-lg border border-gray-400 bg-white p-8 shadow-md dark:border-gray-600 dark:bg-slate-800"
                key={message.time}
              >
                <div className=" mb-4 flex items-center gap-2">
                  <div className="h-6 w-6 overflow-hidden  rounded-full bg-gray-600">
                    <img src={message.avatar} alt="user-icon" />
                  </div>

                  <h2 className="text-sm font-medium">{message.userName}</h2>
                </div>
                <h2 className="text-sm font-light">{message.message}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
