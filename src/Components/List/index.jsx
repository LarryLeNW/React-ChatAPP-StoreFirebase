import ChatList from "./ChatList";
import UserInfo from "./UserInfo";
import "./style.scss";

function List() {
  return (
    <div id="list">
      <UserInfo></UserInfo>
      <ChatList></ChatList>
    </div>
  );
}

export default List;
