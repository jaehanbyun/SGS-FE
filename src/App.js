import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Preview from "./pages/Preview";
import StudyRoom from "./pages/StudyRoom";
import "./styles/default.css";
import Success from "./pages/Success";
import ChatRoom from "./pages/ChatRoom";

const Layout = () => {
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <SideBar />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Preview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/main" element={<Layout />}>
            <Route path="/main" element={<Main />} />
            <Route path="/main/:vidId" element={<StudyRoom />} />
            <Route path="/main/:roomId" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
