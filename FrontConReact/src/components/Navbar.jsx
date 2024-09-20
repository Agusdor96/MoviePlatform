import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Amdb</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-movie">Add Movie</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;