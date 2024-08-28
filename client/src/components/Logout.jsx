import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const url = "http://localhost:4000"

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(url + "/users/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        onLogout();
        navigate("/"); 
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
