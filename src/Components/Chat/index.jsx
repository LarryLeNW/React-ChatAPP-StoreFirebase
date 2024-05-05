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

function Chat() {
  const [openFormEmoji, setOpenFormEmoji] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
        <div className="message own">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <p>
              sdflsjdflsjdf sdfsdfsdfsdfsdfs
              ssdffffffffffffffffffffffffffffffffffffff
              dfsdfljjjjjsdjlfffffffffffffffffffffffffffff sdfsdfsdf
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message ">
          <div className="texts">
            <p>
              sdflsjdflsjdf sdfsdfsdfsdfsdfs
              ssdffffffffffffffffffffffffffffffffffffff
              dfsdfljjjjjsdjlfffffffffffffffffffffffffffff sdfsdfsdf
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <p>
              sdflsjdflsjdf sdfsdfsdfsdfsdfs
              ssdffffffffffffffffffffffffffffffffffffff
              dfsdfljjjjjsdjlfffffffffffffffffffffffffffff sdfsdfsdf
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <p>
              sdflsjdflsjdf sdfsdfsdfsdfsdfs
              ssdffffffffffffffffffffffffffffffffffffff
              dfsdfljjjjjsdjlfffffffffffffffffffffffffffff sdfsdfsdf
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <img src={cameraIcon} alt="" />
            <p>
              sdflsjdflsjdf sdfsdfsdfsdfsdfs
              ssdffffffffffffffffffffffffffffffffffffff
              dfsdfljjjjjsdjlfffffffffffffffffffffffffffff sdfsdfsdf
            </p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <div className="sendButton">Send</div>
      </div>
    </div>
  );
}

export default Chat;
