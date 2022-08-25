import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { StochasticSeries } from "@react-financial-charts/series";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import {
  MouseCoordinateY,
  MouseCoordinateX,
  ZoomButtons,
  StochasticTooltip,
} from "react-financial-charts";
import { mouseEdgeAppearance } from "../Type";
function Stochastic(props) {
  const stochasticDisplayFormat = format(".2f");

  return (
    <>
      {props.isbottom ? (
        <XAxis
          showGridLines
          gridLinesStrokeStyle="#e0e3eb"
          zoomEnabled={true}
          showTickLabel={true}
        />
      ) : null}
      <YAxis
        showGridLines
        axisAt="right"
        orient="right"
        ticks={5}
        tickLabelFill="#FFFFFF"
        gridLinesStrokeDasharray="Solid"
      />
      <StochasticSeries yAccessor={props.stoCalculator.accessor()} />
      <StochasticTooltip
        origin={[0, 15]}
        yAccessor={props.stoCalculator.accessor()}
        options={props.stoCalculator.options()}
        label="Fast STO"
        textFill="#FFFFFF"
        labelFill="rgba(0, 0, 0)"
        fontSize={12.5}
        displayFormat={stochasticDisplayFormat}
        appearance={{ stroke: StochasticSeries.defaultProps.strokeStyle }}
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
        displayFormat={stochasticDisplayFormat}
        {...mouseEdgeAppearance}
      />
      {props.isbottom && <ZoomButtons onReset={props.resetzoom} />}
    </>
  );
}

export default Stochastic;
