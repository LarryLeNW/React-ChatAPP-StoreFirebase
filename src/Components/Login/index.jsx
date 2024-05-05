import { useState } from "react";
import avatarIcon from "../../Access/Img/avatar.png";
import "./style.scss";
import { toast } from "react-toastify";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleOnchangeAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    console.log("🚀 ~ handleLogin ~ password:", password);
    console.log("🚀 ~ handleLogin ~ email:", email);

    toast.success("integate successfully ...");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    console.log("🚀 ~ handleLogin ~ password:", password);
    console.log("🚀 ~ handleLogin ~ email:", email);
    console.log("🚀 ~ handleLogin ~ username:", username);
    toast.success("hadle register ...");
  };

  return (
    <div id="login">
      <div className="item">
        <h2>Wellcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Enter email..." name="email" />
          <input type="text" placeholder="Enter password..." name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>

      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || avatarIcon} alt="" />
            Upload Avatar
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleOnchangeAvatar}
          />
          <input type="text" placeholder="Enter email..." name="email" />
          <input type="text" placeholder="Enter username..." name="username" />
          <input type="text" placeholder="Enter password..." name="password" />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
