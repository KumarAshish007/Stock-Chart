import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { MACDSeries } from "@react-financial-charts/series";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import {
  MouseCoordinateY,
  MouseCoordinateX,
  ZoomButtons
} from "react-financial-charts" 
import { MACDTooltip } from "@react-financial-charts/tooltip";
import { mouseEdgeAppearance } from "../Type";
const macdAppearance = {
  fillStyle: {
    divergence: "#4682B4",
},
strokeStyle: {
    macd: "#0093FF",
    signal: "#D84315",
    zero: "rgba(0, 0, 0, 0.3)",
},
};

function Macd(props) {
  const macdDisplayFormat = format(".2f");

  return (
    <>
      {props.isbottom ? <XAxis axisAt="bottom" orient="bottom" /> : null}
      <YAxis axisAt="right" orient="right" ticks={4} />
      <MACDSeries
        yAccessor={props.macdCalculator.accessor()}
        options={props.macdCalculator.options()}
        {...macdAppearance}
      />
      <MACDTooltip
        origin={[0, 15]}
        yAccessor={(d) => d.macd}
        options={props.macdCalculator.options()}
        appearance={macdAppearance}
      />
      {props.isbottom && (
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%d-%m-%Y")}
          rectRadius={5}
          {...mouseEdgeAppearance}
        />
      )}
      <MouseCoordinateY
        displayFormat={macdDisplayFormat}
        at="right"
        orient="right"
        {...mouseEdgeAppearance}
      />
      {props.isbottom ? <ZoomButtons onReset={props.resetzoom} /> : null}
    </>
  );
}

export default Macd;
