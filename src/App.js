import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./Components/Layout/Header";
import UsersPage from "./Pages/UsersPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<UsersPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
