import "./style.scss";
import SearchIcon from "../../../Access/Img/search.png";
import PlusIcon from "../../../Access/Img/plus.png";
import MinusIcon from "../../../Access/Img/minus.png";
import AvatarIcon from "../../../Access/Img/avatar.png";

import { useState } from "react";
import AddUser from "../../AddUser";

function ChatList() {
  const [addMode, setAddMode] = useState(false);

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
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <img src={AvatarIcon} alt="avatar icon" />
          <div className="texts">
            <span>NhuNgoc</span>
            <p>Hello</p>
          </div>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
