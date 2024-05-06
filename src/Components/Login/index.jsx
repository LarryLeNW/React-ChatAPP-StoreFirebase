import { useState } from "react";
import avatarIcon from "../../Access/Img/avatar.png";
import "./style.scss";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase/init";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../config/upload";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnchangeAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("🚀 ~ handleLogin ~ res:", res);
      toast.success("integate successfully ...");
    } catch (error) {
      toast.warning("Something went wrong " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password, username } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password); // Await the result here
      const imgUrL = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        username,
        avatar: imgUrL,
        email,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created , you can login now ...");
    } catch (error) {
      toast.warning(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login">
      <div className="item">
        <h2>Wellcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Enter email..." name="email" />
          <input type="text" placeholder="Enter password..." name="password" />
          <button disabled={loading}>
            {loading ? "loading..." : "Sign in"}
          </button>
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
          <input type="email" placeholder="Enter email..." name="email" />
          <input type="text" placeholder="Enter username..." name="username" />
          <input type="text" placeholder="Enter password..." name="password" />
          <button disabled={loading}>
            {loading ? "loading..." : "sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
