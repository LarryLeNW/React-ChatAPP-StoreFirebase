import Chat from "./Components/Chat";
import Detail from "./Components/Detail";
import List from "./Components/List";
import Login from "./Components/Login";
import Notification from "./Components/Notification";

function App() {
  const islogged = false;

  return (
    <div className="container">
      {islogged ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
