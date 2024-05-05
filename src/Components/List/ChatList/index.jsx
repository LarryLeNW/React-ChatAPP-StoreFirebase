import "./style.scss";
import SearchIcon from "../../../Access/Img/search.png";
import PlusIcon from "../../../Access/Img/plus.png";
import MinusIcon from "../../../Access/Img/minus.png";
import AvatarIcon from "../../../Access/Img/avatar.png";

import { useEffect, useState } from "react";
import AddUser from "../../AddUser";
import { useUserStore } from "../../../StateCenter/user.store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useChatStore } from "../../../StateCenter/chat.store";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const { user_current } = useUserStore();
  const [userChats, setUserChats] = useState([]);
  const { changeChat } = useChatStore();

  const handleSelectChat = (chat) => {
    changeChat(chat.chatId, chat.user);
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
        setUserChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [user_current?.id]);

  return (
    <div id="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={SearchIcon} alt="search icon" />
          <input type="text" placeholder="search..." />
        </div>
        <img
          src={addMode ? MinusIcon : PlusIcon}
          alt="ModeIcon"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      <div className="items">
        {userChats?.map((chat) => {
          return (
            <div
              className="item"
              key={chat.chatId}
              onClick={() => handleSelectChat(chat)}
            >
              <img src={chat.user.avatar || AvatarIcon} alt="avatar icon" />
              <div className="texts">
                <span>{chat.user.username}</span>
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
