import "./App.css";
import Home from "./containers/home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./containers/login";
import UserDashBoard from "./containers/userDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserDashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
