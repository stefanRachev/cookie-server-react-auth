import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState ,useEffect} from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Logout from "./components/Logout";
import DataCreator from "./components/DataCreator"

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/check', {
          method: 'GET',
          credentials: 'include' 
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Cookie - Server - React + Vite - Node Express - Mongoose</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
        {isAuthenticated && (
          <>
            <Logout onLogout={handleLogout} />
            <DataCreator isAuthenticated={isAuthenticated} />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
