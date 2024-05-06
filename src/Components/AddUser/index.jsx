import "./style.scss";
import avatarIcon from "../../Access/Img/avatar.png";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase/init";
import { useState } from "react";
import { useUserStore } from "../../StateCenter/user.store";

function AddUser() {
  const { user_current } = useUserStore();
  const [userFound, setUserFound] = useState(null);

  const handleAddUserChats = async (idUser) => {
    try {
      const chatRef = collection(db, "chats");
      const userChatsRef = collection(db, "userchats");
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, userFound.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user_current.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, user_current.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: userFound.id,
          updatedAt: Date.now(),
        }),
      });

      console.log("🚀 ~ handleAddUserChats ~ newChatRef:", newChatRef.id);
    } catch (error) {
      console.log("🚀 ~ handleAddUserChats ~ error:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnaphot = await getDocs(q);

      if (!querySnaphot.empty) {
        setUserFound(querySnaphot.docs[0].data());
      }
    } catch (error) {
      console.log("🚀 ~ handleSearch ~ error:", error);
    }
  };

  return (
    <div id="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder="Find other people." />
        <button>Search</button>
      </form>
      {userFound && (
        <div className="user">
          <div className="detail">
            <img src={userFound?.avatar || avatarIcon} alt="avatarIcon" />
            <span>{userFound?.username}</span>
          </div>
          <button onClick={() => handleAddUserChats(userFound.id)}>
            Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
