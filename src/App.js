import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./Components/Layout/Navbar";
import UsersPage from "./Pages/UsersPage";
import LoginPage from "./Pages/LoginPage";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Container className="app-container">
            <Routes>
              <Route exact path="/" element={<UsersPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
