import { useState } from "react";
import "./ChartDropDown.css";
const iconmap = {
  Candle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="26"
      height="26"
    >
      <path d="M16 3v3h-2v12h2v5h1v-5h2V6h-2V3h-1zM9 4v5H7v11h2v3h1v-3h2V9h-2V4H9zm-1 6h3v9H8v-9z"></path>
    </svg>
  ),
  "Heikin Ashi": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="26"
      height="26"
    >
      <path d="M16 3v3h-2v12h2v5h1v-5h2V6h-2V3h-1zM9 4v5H7v11h2v3h1v-3h2V9h-2V4H9z"></path>
    </svg>
  ),
  Renko: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="26"
      height="26"
    >
      <path d="M12 4v6h3V4h-3zm3 6v6h3v-6h-3zm3 6v6h3v-6h-3zm-6-6H9v6h3v-6zm-3 6H6v6h3v-6zm4-11h1v4h-1V5zm-3 6h1v4h-1v-4zm-3 6h1v4H7v-4z"></path>
    </svg>
  ),
  Area: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 595.3 841.9"
      enableBackground="new 0 0 595.3 841.9"
      width="26"
      height="26"
    >
      <path
        d="M453.8 360.2l-92.1 6L234 517.7l-86.2-86.1L5.2 514.7v118.9h585.3V268.1z"
        opacity=".3"
      ></path>
      <path d="M234 508.8c-156 222.067-78 111.033 0 0zm309-276.3l-71.3 95.1h-101L236.9 488l-92.1-112.9-38.6 41.6-101 98.1 41.6 41.6 95.1-95.1L234 574.2 397.4 387h104l89.1-118.9z"></path>
    </svg>
  ),
  Line: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 595.3 841.9"
      enableBackground="new 0 0 595.3 841.9"
      width="26"
      height="26"
    >
      <path d="M142.5 447.4c-102.74 102.74-83.44 83.44 0 0m399-186.2l-70.9 94.6H370.1l-136 159.6-91.6-112.3-38.5 41.4L6.5 542l41.4 41.4 94.6-94.6 91.6 112.3 162.6-186.2h103.5l88.7-118.2z"></path>
    </svg>
  ),
  "Point & Figure": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="26"
      height="26"
    >
      <path d="M4 4v1h1v1h1v1H5v1H4v1h2V8h1v1h2V8H8V7H7V6h1V5h1V4H7v1H6V4H4zm12 0v1h1v1h1v1h-1v1h-1v1h2V8h1v1h2V8h-1V7h-1V6h1V5h1V4h-2v1h-1V4h-2zM4 10v1h1v1h1v1H5v1H4v1h2v-1h1v1h2v-1H8v-1H7v-1h1v-1h1v-1H7v1H6v-1H4zm7 0v1h-1v3h1v1h3v-1h1v-3h-1v-1h-3zm5 0v1h1v1h1v1h-1v1h-1v1h2v-1h1v1h2v-1h-1v-1h-1v-1h1v-1h1v-1h-2v1h-1v-1h-2zm-4 1h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1zm-8 5v1h1v1h1v1H5v1H4v1h2v-1h1v1h2v-1H8v-1H7v-1h1v-1h1v-1H7v1H6v-1H4zm7 0v1h-1v3h1v1h3v-1h1v-3h-1v-1h-3zm1 1h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path>
    </svg>
  ),
  Kagi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="26"
      height="26"
    >
      <path d="M7 4v17H5v-4H4v5h4V6h2v11h8l-.076-7H20v10h3V7h-8v7h-2V4z"></path>
    </svg>
  ),
  Bars: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="26"
      height="26"
    >
      <path d="M16 4v7h-3v2h3v7h2v-2h3v-2h-3V4h-2zM7 6v12H4v2h3v2h2V10h3V8H9V6H7z"></path>
    </svg>
  ),
};

const ChartDropDown = (props) => {
  const [show, setshow] = useState(false);
  const [clickeditem, setclicked] = useState("Candle");

  return (
    <>
      <div className="chart-dropdown">
        <div className="drop-icon">
          <span className="selected-chart">{iconmap[clickeditem]}</span>
          <span className="selected-chart" onClick={() => setshow((p) => !p)}>
            {show ? (
              <i
                className="fa fa-caret-up"
                style={{ fontSize: "24px", paddingLeft: "2px" }}
              ></i>
            ) : (
              <i
                className="fa fa-caret-down"
                style={{ fontSize: "24px", paddingLeft: "2px" }}
              ></i>
            )}
          </span>
        </div>
        <ul className={`dropdown-list dropdown-list-${show ? "show" : ""}`}>
          <li
            onClick={() => {
              props.setMainChart("Candle");
              setshow(false);
              setclicked("Candle");
            }}
            className="chart-option"
          >
            {iconmap["Candle"]}
            <span className="title">Candle</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Heikin Ashi");
              setshow(false);
              setclicked("Heikin Ashi");
            }}
            className="chart-option"
          >
            {iconmap["Heikin Ashi"]}
            <span className="title">Heikin Ashi</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Renko");
              setshow(false);
              setclicked("Renko");
            }}
            className="chart-option"
          >
            {iconmap["Renko"]}
            <span className="title">Renko</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Area");
              setshow(false);
              setclicked("Area");
            }}
            className="chart-option"
          >
            {iconmap["Area"]}
            <span className="title">Area</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Line");
              setshow(false);
              setclicked("Line");
            }}
            className="chart-option"
          >
            {iconmap["Line"]}
            <span className="title">Line</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Point & Figure");
              setshow(false);
              setclicked("Point & Figure");
            }}
            className="chart-option"
          >
            {iconmap["Point & Figure"]}
            <span className="title">{"Point & Figure"}</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Kagi");
              setshow(false);
              setclicked("Kagi");
            }}
            className="chart-option"
          >
            {iconmap["Kagi"]}
            <span className="title">Kagi</span>
          </li>
          <li
            onClick={() => {
              props.setMainChart("Bars");
              setshow(false);
              setclicked("Bars");
            }}
            className="chart-option"
          >
            {iconmap["Bars"]}
            <span className="title">Bars</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChartDropDown;
