import { onAuthStateChanged } from "firebase/auth";
import Chat from "./Components/Chat";
import Detail from "./Components/Detail";
import List from "./Components/List";
import Login from "./Components/Login";
import Notification from "./Components/Notification";
import { useEffect } from "react";
import { auth } from "./config/firebase/init";
import { useUserStore } from "./StateCenter/user.store";
import { useChatStore } from "./StateCenter/chat.store";

function App() {
  const { user_current, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div id="loading">Loading. ..</div>;

  return (
    <div className="container">
      {user_current ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
