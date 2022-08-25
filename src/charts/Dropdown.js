import "./Dropdown.css";
import Button from "../uielements/Button/Button";
import { Button as MaterialB } from "@mui/material";
import { useState } from "react";

const Dropdown = (props) => {
  const [show, setshow] = useState(false);
  const [clickeditem, setclicked] = useState(null);
  if (props.label === "Crypto") {
    return (
      <div className="dropdown">
        <h6 style={{color:"#e23028",opacity:"0.7" ,fontWeight:"500",display:"flex",justifyContent:"center"}}>{props.label}</h6>
        <MaterialB
          size="large" 
          style={{color:"#e23028",backgroundColor:"rgba(226,48,40,.06274509803921569)",fontWeight:"500"}}
          onClick={() => {
            props.onClick("Crypto");
            setshow(false);
            setclicked("Crypto");
          }}
        >
          {!clickeditem ? `${props.label}` : clickeditem}
        </MaterialB>
      </div>
    );
  }
  return (
    <>
      <div className={`dropdown`}>
        <h6 style={{color:"#e23028",opacity:"0.7" ,fontWeight:"500",display:"flex",justifyContent:"center"}}>{props.label}</h6>
        <MaterialB
          size="large" 
          style={{color:"#e23028",backgroundColor:"rgba(226,48,40,.06274509803921569)",fontWeight:"500"}}
          onClick={() => {
            setshow((prev) => !prev);
          }}
        >
          {!clickeditem ? `${props.label}` : clickeditem}
        </MaterialB>
        <div className={`dropdown-content ${show ? "dropdown-show" : ""}`}>
          {props.list.map((val, i) => {
            return (
              <Button
                key={i}
                size="small"
                inverse
                onClick={() => {
                  props.onClick(val,props.label);
                  setshow(false);
                  setclicked(val);
                }}
              >
                {val}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
