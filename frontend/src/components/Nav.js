import { NavLink } from "react-router-dom";
function Nav() {
  return (
      <ul className="flex">
        <li className="flex-1 mr-2">
          <NavLink
            activeClassName="text-white text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700"
            className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" 
            to="/"
            exact
          >
            Home
          </NavLink>
        </li>
        <li className="flex-1 mr-2">
          <NavLink
             activeClassName="text-center text-white block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700"
             className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
             to="/create"
          >
            Create
          </NavLink>
        </li>
        <li className="text-center flex-1">
          <NavLink
          activeClassName="text-center text-white block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700"
          className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
  );
}

export default Nav;
