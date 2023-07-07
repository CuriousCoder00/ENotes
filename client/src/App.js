import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NoteState from "./Context/Notes/NoteState";
import { Alert } from "./Components/Alert";
import Login from "./Components/Login";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.background = "#0c0c1f";
      document.body.style.color = "white";
    } else {
      setTheme("light");
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  };

  return (
    <NoteState>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Alert />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home theme={theme} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
