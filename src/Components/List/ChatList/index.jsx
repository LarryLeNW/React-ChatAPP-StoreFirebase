import "./style.scss";
import SearchIcon from "../../../Access/Img/search.png";
import PlusIcon from "../../../Access/Img/plus.png";
import MinusIcon from "../../../Access/Img/minus.png";
import AvatarIcon from "../../../Access/Img/avatar.png";

import { useEffect, useState } from "react";
import AddUser from "../../AddUser";
import { useUserStore } from "../../../StateCenter/user.store";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase/init";
import { useChatStore } from "../../../StateCenter/chat.store";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const { user_current } = useUserStore();
  const [chats, setChats] = useState([]);
  const { changeChat } = useChatStore();
  const [searchUserChatText, setSearchUserChatText] = useState("");

  const handleSelectChat = async (chat) => {
    // hand toogle isSeen
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex((item) => item.chatId == chat.chatId);

    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", user_current.id);
    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log("🚀 ~ handleSelectChat ~ error:", error);
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", user_current?.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [user_current?.id]);

  const filterChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(searchUserChatText.toLowerCase())
  );

  return (
    <div id="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={SearchIcon} alt="search icon" />
          <input
            type="text"
            placeholder="search..."
            value={searchUserChatText}
            onChange={(e) => setSearchUserChatText(e.target.value)}
          />
        </div>
        <img
          src={addMode ? MinusIcon : PlusIcon}
          alt="ModeIcon"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      <div className="items">
        {filterChats?.map((chat) => {
          return (
            <div
              className="item"
              key={chat.chatId}
              onClick={() => handleSelectChat(chat)}
              style={{
                backgroundColor: chat.isSeen ? "transparent" : "#5183fe",
              }}
            >
              <img
                src={
                  chat.user.blocked.includes(user_current.id)
                    ? AvatarIcon
                    : chat.user.avatar || AvatarIcon
                }
                alt="avatar icon"
              />
              <div className="texts">
                <span>
                  {chat.user.blocked.includes(user_current.id)
                    ? "User Disable"
                    : chat.user.username}
                </span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          );
        })}
      </div>
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
