// import CloseIcon from "@mui/icons-material/Close";
import "./IndicatorSelector.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const IndicatorSelector = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        size="small"
      >
        Indicators
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{
          zindex: 1,
          right: 0,
          bottom: 0,
          top: "0px",
          left: "10%",
        }}
      >
        {/* <div
          className="div"
          style={{ display: "flex", justifyContent: "right" }}
        > */}
        {/* <CloseIcon
            onClick={props.handleIndicatorsClose}
            style={{
              cursor: "pointer",
              fullWidth: true,
              maxWidth: "sm",
            }}
          />
        </div> */}
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Indicators
        </DialogTitle>
        <DialogContent dividers style={{ padding: "5px 0px" }}>
          <div className="indicator-container">
            {props.indicators &&
              props.indicators.map((indicator) => {
                return (
                  <div
                    className="indicator"
                    key={indicator}
                    onClick={() =>
                      props.handleIndicatorsChange(
                        indicator,
                        !!!props.selectedIndicators.find((e) => e === indicator)
                      )
                    }
                  >
                    <div className="indicator-content">
                      <div className="indicator-title" name={indicator}>
                        <div
                          className={`check-icon-hidden ${
                            props.selectedIndicators.find(
                              (e) => e === indicator
                            )
                              ? "check-icon-show"
                              : ""
                          }`}
                        >
                          <CheckIcon />
                        </div>
                        {indicator}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogContent>
        <div className="close-icon" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 13"
            width="13"
            height="13"
          >
            <path d="M5.182 6.596l-3.889-3.889-.707-.707 1.414-1.414.707.707 3.889 3.889 3.889-3.889.707-.707 1.414 1.414-.707.707-3.889 3.889 3.889 3.889.707.707-1.414 1.414-.707-.707-3.889-3.889-3.889 3.889-.707.707-1.414-1.414.707-.707 3.889-3.889z"></path>
          </svg>
        </div>
      </Dialog>
    </>
  );
};

export default IndicatorSelector;
