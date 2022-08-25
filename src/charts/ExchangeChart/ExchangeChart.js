import React from "react";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import { YAxis, XAxis } from "@react-financial-charts/axes";
import { mouseEdgeAppearance } from "../Type";
import {
  CandlestickSeries,
  AreaSeries,
  KagiSeries,
  RenkoSeries,
  PointAndFigureSeries,
  OHLCSeries,
  LineSeries,
  BollingerSeries,
} from "@react-financial-charts/series";
import {
  MouseCoordinateY,
  EdgeIndicator,
  OHLCTooltip,
  BollingerBandTooltip,
  ZoomButtons,
  MouseCoordinateX,
} from "react-financial-charts";
import { bbCalculator } from "../indicatorCalculator";
import Ema from "../TechnicalIndicators/Ema";

function ExchangeChart(props) {
  const pricesDisplayFormat = format(".2f");
  const dateTimeFormat = "%d-%m-%Y";
  const timeDisplayFormat = timeFormat(dateTimeFormat);
  const { mainChart, isbottom } = props; 

  const downColor = "#e74c3c";
  const upColor = "#2ecc71";
 
  return (
    <React.Fragment>
      {isbottom && (
        <XAxis
          showGridLines
          gridLinesStrokeStyle="#e0e3eb"
          zoomEnabled={true}
          showTickLabel={true}
        />
      )}
      <YAxis tickFormat={pricesDisplayFormat} zoomEnabled={true}  />
      {!!props.selectedIndicators.find((e) => e === "EMA 5-100") && (
        <Ema ema={props.ema} />
      )}{" "}
      {!!props.selectedIndicators.find((e) => e === "Bollinger Band") && (
        <>
          {" "}
          <BollingerSeries
            yAccessor={(d) => d.bb}
            fillStyle="rgba(38,186,153,0.1)"
          />
          <BollingerBandTooltip
            origin={[330, 16]}
            yAccessor={(d) => d.bb}
            options={bbCalculator.options()}
          />
        </>
      )}{" "}
      {(mainChart === "Candle" || mainChart === "Heikin Ashi") && (
        <CandlestickSeries fill={(d)=>(d.close > d.open ? "#2ecc71" : "#e74c3c")}/>
      )}
      {mainChart === "Area" && (
        <AreaSeries
          yAccessor={(d) => d.close}
          strokeWidth={3}
          strokeStyle="rgba(100,204,255,1)"
        />
      )}
      {mainChart === "Kagi" && <KagiSeries />}
      {mainChart === "Renko" && <RenkoSeries />}
      {mainChart === "Point & Figure" && (
        <PointAndFigureSeries strokeWidth={0.9} />
      )}
      {mainChart === "Bars" && (
        <OHLCSeries
          stroke={(d) => (d.close > d.open ? "#2ecc71" : "#e74c3c")} 
          strokeWidth={2}
        />
      )}
      {mainChart === "Line" && (
        <LineSeries
          yAccessor={(d) => d.close}
          strokeWidth={2}
          highlightOnHover
        />
      )}
      <OHLCTooltip origin={[8, 16]} />
      <MouseCoordinateY
        rectWidth={props.margin.right}
        displayFormat={pricesDisplayFormat}
        {...mouseEdgeAppearance}
      />
      <EdgeIndicator
        itemType="last"
        orient="right"
        edgeAt="right"
        arrowWidth={10}
        yAccessor={(d) => d.close}
        lineStroke={(d) => d.close > d.open ? upColor : downColor}
        fill={(d) => d.close > d.open ? upColor : downColor}
      />
      <MouseCoordinateY
        displayFormat={pricesDisplayFormat} 
        at="right"
        orient="right"
        {...mouseEdgeAppearance}
      />
      {isbottom && (
        <MouseCoordinateX
          displayFormat={timeDisplayFormat}
          {...mouseEdgeAppearance}
        />
      )}
      {isbottom && <ZoomButtons onReset={props.resetzoom} />}
    </React.Fragment>
  );
}

export default ExchangeChart;
