import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Preview from "./pages/Preview";
import StudyRoom from "./pages/StudyRoom";
import styles from "./App.module.css";
import "./styles/default.css";
import Success from "./pages/Success";
import Signaling from "./utils/webrtc";

const Layout = () => {
  return (
    <div className={styles.all}>
      <SideBar />
      <Outlet />
    </div>
  );
};
const signaling = new Signaling();
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/main" element={<Layout />}>
          <Route path="/main" element={<Main signaling={signaling} />} />
          <Route
            path="/main/:roomId"
            element={<StudyRoom signaling={signaling} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
