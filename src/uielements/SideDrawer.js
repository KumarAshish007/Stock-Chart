import React from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";
const SideDrawer = (props) => {
  const content = (
    <aside
      className={`${props.show ? "sidedrawer active" : "sidedrawer"}`}
      onClick={props.onClick}
    >
      {props.children}
    </aside>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;