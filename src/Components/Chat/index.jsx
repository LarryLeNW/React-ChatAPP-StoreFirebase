import "./style.scss";
import avatarIcon from "../../Access/Img/avatar.png";
import phoneIcon from "../../Access/Img/phone.png";
import videoIcon from "../../Access/Img/video.png";
import infoIcon from "../../Access/Img/info.png";
import emojiIcon from "../../Access/Img/emoji.png";
import imgIcon from "../../Access/Img/img.png";
import cameraIcon from "../../Access/Img/camera.png";
import micIcon from "../../Access/Img/mic.png";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useChatStore } from "../../StateCenter/chat.store";
import { useUserStore } from "../../StateCenter/user.store";

function Chat() {
  const [openFormEmoji, setOpenFormEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const endRef = useRef(null);
  const { chatId } = useChatStore();
  const { user_current } = useUserStore();
  const { user } = useChatStore();

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    let unSub;
    if (chatId) {
      unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data());
      });
    }
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleSend = async () => {
    if (!text) return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: user_current.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [user_current.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === user_current ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleSend ~ error:", error);
    }
  };

  return (
    <div id="chat">
      {/* SESSION TOP */}
      <div className="top">
        <div className="user">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <span>Larryle</span>
            <p>something...</p>
          </div>
        </div>
        <div className="icons">
          <img src={phoneIcon} alt="phoneIcon" />
          <img src={videoIcon} alt="videoIcon" />
          <img src={infoIcon} alt="infoIcon" />
        </div>
      </div>

      {/* SESSION CENTER */}
      <div className="center">
        {chat?.messages?.map((mess) => {
          return (
            <div className="message own" key={mess?.createAt}>
              {mess.img && <img src={mess.img} alt="" />}
              <div className="texts">
                <p>{mess.text}</p>
                {/* <span>1 min ago</span> */}
              </div>
            </div>
          );
        })}
        <div ref={endRef}></div>
      </div>

      {/* SESSION BOTTOM */}
      <div className="bottom">
        <div className="icons">
          <img src={imgIcon} alt="imgIcon" />
          <img src={cameraIcon} alt="cameraIcon" />
          <img src={micIcon} alt="micIcon" />
        </div>
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src={emojiIcon}
            alt="emojiIcon"
            onClick={() => setOpenFormEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker
              open={openFormEmoji}
              onEmojiClick={(e) =>
                setText((prev) => {
                  setOpenFormEmoji(false);
                  return prev + e.emoji;
                })
              }
            />
          </div>
        </div>
        <div className="sendButton" onClick={handleSend}>
          Send
        </div>
      </div>
    </div>
  );
}

export default Chat;
