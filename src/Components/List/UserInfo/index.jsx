import "./style.scss";
import Avatar from "../../../Access/Img/avatar.png";
import MoreIcon from "../../../Access/Img/more.png";
import VideoIcon from "../../../Access/Img/video.png";
import EditIcon from "../../../Access/Img/edit.png";
import { useState } from "react";

function UserInfo() {
  return (
    <div id="userInfo">
      <div className="user">
        <img src={Avatar} alt="avatar" />
        <h2>LarryLe</h2>
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
