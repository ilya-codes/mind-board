import Message from "../components/Message";
import Button from "../components/Button";
import { BsTextRight } from "react-icons/bs";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Details = () => {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

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
      <div className="pt-5">
        <form onSubmit={sendComment} className="flex pb-5">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Send a message"
            className=" bg-gray-600 w-full px-4 py-2 text-white outline-none rounded-lg rounded-r-none"
          />
          <Button group>
            <BsTextRight className=" self-center mr-1" />
            <span className="self-center">Send</span>
          </Button>
        </form>

        <div className=" py-5 ">
          <h2 className="text-lg">Comments</h2>
          <div className="flex flex-col-reverse">
            {allMessages?.map((message) => (
              <div
                className=" bg-white p-8 mt-5 shadow-md rounded-lg"
                key={message.time}
              >
                <div className=" flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gray-600  rounded-full overflow-hidden">
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
