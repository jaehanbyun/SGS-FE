import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import "./styles/default.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Preview />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
