import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Preview from "./pages/Preview";
import "./styles/default.css";
import Success from "./pages/Success";

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
          <Route path="/success" element={<Success />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
