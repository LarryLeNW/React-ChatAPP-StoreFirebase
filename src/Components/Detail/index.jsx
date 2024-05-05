import "./detail.scss";
import avatarIcon from "../../Access/Img/avatar.png";
import arrowUpIcon from "../../Access/Img/arrowUp.png";
import downloadIcon from "../../Access/Img/download.png";

function Detail() {
  return (
    <div id="detail">
      <div className="user">
        <img src={avatarIcon} alt="avatarIcon" />
        <h2>LarryLe</h2>
        <p>sOME THING some thing....</p>
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
        <button>Block user</button>
      </div>
    </div>
  );
}

export default Detail;
