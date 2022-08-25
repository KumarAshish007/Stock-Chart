import {
  Chart,
  ChartCanvas,
  BarSeries,
  lastVisibleItemBasedZoomAnchor,
  CrossHairCursor,
  withDeviceRatio,
  withSize, 
  elderRay,
  last,
} from "react-financial-charts";
import {
  emaCalculator,
  emasFunctions,
  stoCalculator,
  macdCalculator,
  rsiCalculator,
  bbCalculator,
  elderRayCalculator,
} from "./indicatorCalculator";
import { useState } from "react";
import ExchangeChart from "./ExchangeChart/ExchangeChart";
import { Scale } from "./scaleprovider";
import Stochastic from "./TechnicalIndicators/Stochastic";
import Macd from "./TechnicalIndicators/Macd";
import Rsi from "./TechnicalIndicators/Rsi";
import ElderRay from "./TechnicalIndicators/ElderRay";
import ElderRayBullPower from "./TechnicalIndicators/ElderRayBullPower";
import ElderRayBearPower from "./TechnicalIndicators/ElderRayBearPower";
import { height_map } from "./Type";
const ChartComponent = (props) => {
  const [zoom, setZoom] = useState(1);
  const { initialData, mainChart, indicatorState,width,ratio } = props; 
   const height=indicatorState.height + 35
  const margin =  {left: 10, right: 50, top: 10, bottom: 30}; //margin of chart svg
  const selectedIndicators = indicatorState.indicators;
  //passing data for calculaion
  const { data, xScale, xAccessor, displayXAccessor } = Scale(
    initialData,
    mainChart
  ); 
  const elder = elderRay();
  if (selectedIndicators.includes("EMA 5-100")) emaCalculator(data);
  if (selectedIndicators.includes("Stochastic Oscillator")) stoCalculator(data);
  if (selectedIndicators.includes("MACD")) macdCalculator(data);
  if (selectedIndicators.includes("RSI")) rsiCalculator(data);
  if (selectedIndicators.includes("Bollinger Band")) bbCalculator(data);
  if (
    selectedIndicators.includes("Elder Ray") ||
    selectedIndicators.includes("Elder Ray(Bull Power)") ||
    selectedIndicators.includes("Elder Ray(Bear Power)")
  )
    elderRayCalculator(data);
  const max = xAccessor(last(data));
  const min = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [min, max + 1];

  const barChartHeight = 150;
  const chartHeight = 400;
  const barChartOrigin = [0, chartHeight - barChartHeight];
  //y extent for canvas
  const yExtents = (data) => {
    return [data.high, data.low];
  };
  //y scale for volume bar
  const barChartExtents = (data) => {
    return data.volume;
  };
  //y scale for candle chart
  const candleChartExtents = (data) => {
    if (mainChart === "Point & Figure") return [data.high, data.low - 1];
    if (data.high < 50) return [data.high, data.low];
    if (data.high < 100) return [data.high + 2, data.low - 5];
    if (data.high < 2000) return [data.high + 20, data.low - 50];

    return [data.high + 40, data.low - 100];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };
  //volume bar color
  const volumeColor = (data) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data) => {
    return data.volume;
  };
  //color to be displayed of latest data at the edge
  const openCloseColor = (data) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  const resetzoom = () => {
    setZoom((prev) => {
      return prev + 1;
    });
  };
  return (
    <>
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        yExtents={yExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
        mouseMoveEvent={true}
        seriesName={`chart_${zoom}`}
        panEvent={true}
        zoomEvent={true}
        clamp={false}
        type="canvas+svg"
      >
        <Chart
          id={1}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart
          id={2}
          height={chartHeight}
          yExtents={candleChartExtents}
          openCloseColor={openCloseColor}
          padding={{ top: 10, bottom: 0 }}
          yEdgeIndicator={yEdgeIndicator}
        > 
          <ExchangeChart
            ema={emasFunctions()}
            openCloseColor={openCloseColor}
            margin={margin}
            yEdgeIndicator={yEdgeIndicator}
            selectedIndicators={selectedIndicators}
            resetzoom={resetzoom}
            mainChart={mainChart}
            isbottom={indicatorState.bottom === "mainChart"}
          />
        </Chart>
        {selectedIndicators.includes("Stochastic Oscillator") && (
          <Chart
            id={3}
            height={height_map["Stochastic Oscillator"]}
            origin={(w, h) => [0, indicatorState["Stochastic Oscillator"]]}
            padding={{ top: 10, bottom: 10 }}
            yExtents={stoCalculator.accessor()}
          >
            <Stochastic
              isbottom={indicatorState.bottom === "Stochastic Oscillator"}
              stoCalculator={stoCalculator}
              resetzoom={resetzoom}
            />
          </Chart>
        )}
        {selectedIndicators.includes("MACD") && (
          <Chart
            id={4}
            height={height_map["MACD"]}
            origin={[0, indicatorState["MACD"]]}
            padding={{ top: 10, bottom: 10 }}
            yExtents={macdCalculator.accessor()}
          >
            <Macd
              isbottom={indicatorState.bottom === "MACD"}
              resetzoom={resetzoom}
              macdCalculator={macdCalculator}
            />
          </Chart>
        )}
        {selectedIndicators.includes("RSI") && (
          <Chart
            id={5}
            height={height_map["RSI"]}
            origin={[0, indicatorState["RSI"]]}
            padding={{ top: 10, bottom: 10 }}
            yExtents={rsiCalculator.accessor()}
          >
            <Rsi
              isbottom={indicatorState.bottom === "RSI"}
              resetzoom={resetzoom}
              rsiCalculator={rsiCalculator}
            />
          </Chart>
        )}
        {selectedIndicators.includes("Elder Ray") && (
          <Chart
            id={6}
            height={height_map["Elder Ray"]}
            origin={[0, indicatorState["Elder Ray"]]}
            padding={{ top: 10, bottom: 10 }}
            yExtents={[0, elder.accessor()]}
          >
            <ElderRay
              isbottom={indicatorState.bottom === "Elder Ray"}
              resetzoom={resetzoom}
            />
          </Chart>
        )}
        {selectedIndicators.includes("Elder Ray(Bull Power)") && (
          <Chart
            id={7}
            height={height_map["Elder Ray(Bull Power)"]}
            yExtents={[
              0,
              (d) => elder.accessor()(d) && elder.accessor()(d).bullPower,
            ]}
            origin={(w, h) => [0, indicatorState["Elder Ray(Bull Power)"]]}
            padding={{ top: 10, bottom: 10 }}
          >
            <ElderRayBullPower
              isbottom={indicatorState.bottom === "Elder Ray(Bull Power)"}
              resetzoom={resetzoom}
            />
          </Chart>
        )}
        {selectedIndicators.includes("Elder Ray(Bear Power)") && (
          <Chart
            id={8}
            height={height_map["Elder Ray(Bear Power)"]}
            yExtents={[
              0,
              (d) => elder.accessor()(d) && elder.accessor()(d).bearPower,
            ]}
            origin={(w, h) => [0, indicatorState["Elder Ray(Bear Power)"]]}
            padding={{ top: 10, bottom: 10 }}
          >
            <ElderRayBearPower
              isbottom={indicatorState.bottom === "Elder Ray(Bear Power)"}
              resetzoom={resetzoom}
            />
          </Chart>
        )}
        <CrossHairCursor  />
      </ChartCanvas>
    </>
  );
};

export default  withSize({ style: {width:"100%",height:"auto"} })(
  withDeviceRatio()(ChartComponent)
);
