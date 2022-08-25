import React from "react";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import "./Navbar.css";
import { useState } from "react";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
function Navbar(props) {
  const [navbar, toggleNavbar] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const changeNav = () => {
    if (window.scrollY >= 15) toggleNavbar(true);
    else toggleNavbar(false);
  };
  window.addEventListener("scroll", changeNav);
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer onClick={closeDrawerHandler} show={drawerIsOpen}>
        <nav className="nav-drawer">
          <NavLinks />
        </nav>
      </SideDrawer>
      <header
        className={navbar ? "main-header main-header-fixed" : "main-header"}
      >
        <div className="nav-items-container">
          <button className="side-drawer-button" onClick={openDrawerHandler}>
            <MenuIcon />
          </button>
          <div className="nav-brand">
            <h3>Stock Charts</h3>
          </div>
          <nav className="main-navigation__header-nav">
            <NavLinks />
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
