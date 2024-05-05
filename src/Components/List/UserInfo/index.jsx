import "./style.scss";
import Avatar from "../../../Access/Img/avatar.png";
import MoreIcon from "../../../Access/Img/more.png";
import VideoIcon from "../../../Access/Img/video.png";
import EditIcon from "../../../Access/Img/edit.png";
import { useState } from "react";
import { useUserStore } from "../../../StateCenter/user.store";

function UserInfo() {
  const { user_current } = useUserStore();
  const { username, avatar } = user_current;

  console.log("🚀 ~ UserInfo ~ user_current:", user_current);

  return (
    <div id="userInfo">
      <div className="user">
        <img src={avatar || Avatar} alt="avatar" />
        <h2>{username}</h2>
      </div>
      <div className="icons">
        <img src={MoreIcon} alt="more icon" />
        <img src={VideoIcon} alt="video icon" />
        <img src={EditIcon} alt="edit icon" />
      </div>
    </div>
  );
}

export default UserInfo;
