import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";

import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import NoteState from "./Context/Notes/NoteState";
import { Alert } from "./Components/Alert";
import Login from "./Components/Login";

const PrivateRoute = ({ isAuthenticated, isUserAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Navbar isUserAuthenticated={isUserAuthenticated}/>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [theme, setTheme] = useState("dark");

  // const toggleTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");
  //     document.body.style.background = "#0c0c1f";
  //     document.body.style.color = "white";
  //   } else {
  //     setTheme("light");
  //     document.body.style.background = "white";
  //     document.body.style.color = "black";
  //   }
  // };

  return (
    <NoteState>
      <Router>
          <Routes>
            <Route
              path="/account"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home theme={theme} />} />
            </Route>
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
