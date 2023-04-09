import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Preview from "./pages/Preview";
import "./styles/default.css";

const Layout = () => {
  return (
    <div>
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
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
