import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import "./styles/default.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
