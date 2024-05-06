import "./detail.scss";
import avatarIcon from "../../Access/Img/avatar.png";
import arrowUpIcon from "../../Access/Img/arrowUp.png";
import downloadIcon from "../../Access/Img/download.png";
import { auth, db } from "../../config/firebase/init";
import { useUserStore } from "../../StateCenter/user.store";
import { useChatStore } from "../../StateCenter/chat.store";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Detail() {
  const { user_current } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();

  const handleBlock = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user_current.id);
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      toast.error(error?.message || "something went wrong ...");
    }
  };

  return (
    <div id="detail">
      <div className="user">
        <img src={user?.avatar || avatarIcon} alt="avatarIcon" />
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={arrowUpIcon} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy % help</span>
            <img src={arrowUpIcon} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={arrowUpIcon} alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src={avatarIcon} alt="avatarIcon" />
                <span>photo2-52.png</span>
              </div>
              <img src={downloadIcon} alt="downloadIcon" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src={arrowUpIcon} alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block this User..."}
        </button>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Detail;
