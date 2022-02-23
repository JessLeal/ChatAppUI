import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./Components/Layout/Navbar";
import UsersPage from "./Pages/UsersPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import LandingPage from "./Pages/LandingPage.js";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Container className="app-container">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/home" element={<LandingPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
