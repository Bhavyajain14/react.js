import { Link } from "react-router-dom";

function PageNav() {
  return (
    <ul>
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <li>
        <Link to="/pricing">Pricing</Link>
      </li>
      <li>
        <Link to="/product">Product</Link>
      </li>
    </ul>
  );
}

export default PageNav;
