import React from "react";
import { format } from "d3-format";
import { LineSeries } from "@react-financial-charts/series";
import { MovingAverageTooltip } from "react-financial-charts";

function Ema(props) {
  const emaDisplayFormat = format(".5f");
  const emaTooltiptop = [];
  const emaTooltipbottom = [];

  for (let i = 0; i < props.ema.length; i++) {
    if (i < 10)
      emaTooltiptop.push({
        stroke: props.ema[i].stroke(),
        type: "EMA",
        windowSize: props.ema[i].options().windowSize,
        yAccessor: props.ema[i].accessor(),
      });
    else
      emaTooltipbottom.push({
        stroke: props.ema[i].stroke(),
        type: "EMA",
        windowSize: props.ema[i].options().windowSize,
        yAccessor: props.ema[i].accessor(),
      });
  }

  return (
    <React.Fragment>
      {props.ema.map((ema, i) => {
        return (
          <LineSeries
            key={i}
            yAccessor={ema.accessor()}
            strokeStyle={ema.stroke()}
            highlightOnHover
          />
        );
      })}
      <MovingAverageTooltip
        origin={[8, 24]}
        fontSize={11}
        displayFormat={emaDisplayFormat}
        options={emaTooltiptop}
      ></MovingAverageTooltip>
      <MovingAverageTooltip
        origin={[8, 55]}
        fontSize={11}
        displayFormat={emaDisplayFormat}
        options={emaTooltipbottom}
      ></MovingAverageTooltip>
    </React.Fragment>
  );
}

export default Ema;
