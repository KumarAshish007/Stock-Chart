import "./Backdrop.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  const backdrop = <div className="backdrop" onClick={props.onClick}></div>;
  return ReactDOM.createPortal(
    backdrop,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;