import { XAxis, YAxis } from "@react-financial-charts/axes";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  MouseCoordinateY,
  MouseCoordinateX,
  ZoomButtons,
  elderRay,
  SingleValueTooltip,
  StraightLine,
  BarSeries,
} from "react-financial-charts";
import { mouseEdgeAppearance } from "../Type";
const ElderRayBearPower = (props) => {
  const elder = elderRay();
  return (
    <>
      {props.isbottom ? <XAxis axisAt="bottom" orient="bottom" /> : null}
      <YAxis axisAt="right" orient="right" ticks={2} />
      <BarSeries
        yAccessor={(d) => elder.accessor()(d) && elder.accessor()(d).bearPower}
        baseAt={(xScale, yScale, d) => yScale(0)}
        fill="#FF0000"
      />
      <StraightLine yValue={0} />
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
        displayFormat={format(".2f")}
        at="right"
        orient="right"
        {...mouseEdgeAppearance}
      />
      <SingleValueTooltip
        yAccessor={(d) => elder.accessor()(d) && elder.accessor()(d).bearPower}
        yLabel="Elder Ray - Bear power"
        yDisplayFormat={format(".2f")}
        origin={[0, 15]}
      />
      {props.isbottom ? <ZoomButtons onReset={props.resetzoom} /> : null}
    </>
  );
};

export default ElderRayBearPower;
