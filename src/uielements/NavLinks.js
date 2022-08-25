import React from "react";
import { NavLink } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import "./NavLinks.css";
const NavLinks = () => {
  return (
    <>
      <ul className="nav-links">
        <li className="nav-item">
          <NavLink
            to="/"
            activeStyle={{
              fontWeight: "bold",
              color: "blue",
            }}
            exact
          >
            <BarChartIcon sx={{ marginRight: 1 }} color="secoundary" />
            Charts
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
