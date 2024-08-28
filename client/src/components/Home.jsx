import { Link } from "react-router-dom";

function Home() {
    return (
      <div>
        <h2>Welcome to the Authentication Example</h2>
        <p>This is the home page. Navigate to Register or Login.</p>
        <nav>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
        </nav>
      </div>
    );
  }
  
  export default Home;