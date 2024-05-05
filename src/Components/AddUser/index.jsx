import "./style.scss";
import avatarIcon from "../../Access/Img/avatar.png";

function AddUser() {
  return (
    <div id="addUser">
      <form action="">
        <input type="text" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src={avatarIcon} alt="avatarIcon" />
          <span>Larry le</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
}

export default AddUser;
