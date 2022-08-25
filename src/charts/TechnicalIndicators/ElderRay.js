import { ElderRaySeries } from "react-financial-charts";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  MouseCoordinateY,
  MouseCoordinateX,
  ZoomButtons,
  elderRay,
  SingleValueTooltip,
} from "react-financial-charts";
import { mouseEdgeAppearance } from "../Type";
const ElderRay = (props) => {
  const elder = elderRay();
  return (
    <>
      {props.isbottom ? <XAxis axisAt="bottom" orient="bottom" /> : null}
      <YAxis axisAt="right" orient="right" ticks={2} />
      <ElderRaySeries yAccessor={elder.accessor()} />
      <SingleValueTooltip
        yAccessor={elder.accessor()}
        yLabel="Elder Ray"
        yDisplayFormat={(d) =>
          `${format(".2f")(d.bullPower)}, ${format(".2f")(d.bearPower)}`
        }
        origin={[0, 15]}
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
        displayFormat={format(".2f")}
        at="right"
        orient="right"
        {...mouseEdgeAppearance}
      />
      {props.isbottom ? <ZoomButtons onReset={props.resetzoom} /> : null}
    </>
  );
};

export default ElderRay;
