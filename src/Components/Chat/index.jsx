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
import { db } from "../../config/firebase/init";
import { useChatStore } from "../../StateCenter/chat.store";
import { useUserStore } from "../../StateCenter/user.store";
import upload from "../../config/firebase/upload";
import dayjs from "dayjs";
import "dayjs/locale/en";
// Optionally, you can import the 'fromNow' plugin for relative time calculation
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function Chat() {
  const [openFormEmoji, setOpenFormEmoji] = useState(false);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [imgSend, setImgSend] = useState({
    file: null,
    url: "",
  });
  const { chatId } = useChatStore();
  const { user_current } = useUserStore();
  const { user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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

  const handleSetImage = (e) => {
    if (e.target.files[0]) {
      setImgSend({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (!text && !imgSend.file) return;
    let urlImg = null;

    try {
      if (imgSend.file) {
        urlImg = await upload(imgSend.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: user_current.id,
          ...(text && { text: text }),
          ...(urlImg && { img: urlImg }),
          createdAt: new Date(),
        }),
      });

      // update chat isseen , lastmess for each user
      const userIDs = [user_current.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text || "Image...";
          userChatsData.chats[chatIndex].isSeen =
            id === user_current.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });

      // reset state input send
      setImgSend({
        file: null,
        url: "",
      });
      setText("");
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
            <div
              className={`message ${
                user_current.id == mess.senderId ? "own" : ""
              }`}
              key={mess?.createdAt}
            >
              {mess.img && <img src={mess.img} alt="" />}
              {mess.text && (
                <div className="texts">
                  <p>{mess.text}</p>
                </div>
              )}

              <span>
                {dayjs(
                  new Date(mess.createdAt.seconds * 1000).toUTCString()
                ).fromNow()}
              </span>
            </div>
          );
        })}
        <div ref={endRef}></div>
      </div>

      {/* SESSION BOTTOM */}
      <div className="bottom">
        <div className="icons">
          <label htmlFor="sendFile">
            <img src={imgIcon} alt="imgIcon" />
          </label>
          <input
            id="sendFile"
            type="file"
            onChange={handleSetImage}
            style={{ display: "none" }}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <img src={cameraIcon} alt="cameraIcon" />
          <img src={micIcon} alt="micIcon" />
        </div>
        <input
          type="text"
          value={text}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You can't send message..."
              : "Type a message..."
          }
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
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
        <div
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </div>
      </div>
    </div>
  );
}

export default Chat;
