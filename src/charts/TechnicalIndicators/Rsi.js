import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { RSISeries } from "@react-financial-charts/series";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import {
  MouseCoordinateY,
  MouseCoordinateX,
  ZoomButtons,
  RSITooltip,
} from "react-financial-charts";
import { mouseEdgeAppearance } from "../Type";
function Rsi(props) {
  const rsiDisplayFormat = format(".2f");

  return (
    <>
      {props.isbottom ? (
        <XAxis
          gridLinesStrokeStyle="#e0e3eb"
          zoomEnabled={true}
          showTickLabel={true}
        />
      ) : null}
      <YAxis
        showGridLines
        gridLinesStrokeWidth={0.5}
        strokeStyle="#FFFFFF"
        axisAt="right"
        orient="right"
        ticks={5}
        tickLabelFill="#FFFFFF"
        gridLinesStrokeDasharray="Solid"
      />
      <RSISeries
        yAccessor={props.rsiCalculator.accessor()}
        strokeStyle={props.rsiCalculator.stroke()}
      />
      <RSITooltip
        origin={[0, 15]}
        yAccessor={props.rsiCalculator.accessor()}
        options={props.rsiCalculator.options()}
        fontSize={12.5}
        displayFormat={rsiDisplayFormat}
      />
      {props.isbottom && (
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%d-%m-%Y")}
          fill="#303030"
          {...mouseEdgeAppearance}
        />
      )}
      <MouseCoordinateY
        displayFormat={rsiDisplayFormat}
        fill="#303030"
        {...mouseEdgeAppearance}
      />
      {props.isbottom && <ZoomButtons onReset={props.resetzoom} />}
    </>
  );
}

export default Rsi;
