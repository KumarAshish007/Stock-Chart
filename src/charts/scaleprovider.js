import {
  heikinAshi,
  kagi,
  renko,
  pointAndFigure,
  discontinuousTimeScaleProviderBuilder,
} from "react-financial-charts";

const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
  (d) => new Date(d.date)
);
let data, xScale, xAccessor, displayXAccessor;
const ha = heikinAshi();
const kagiCalculator = kagi();
const renkoCalculator = renko();

export const Scale = (initialData, mainChart) => {
  const pAndF = pointAndFigure();
  let calculatedData;
  if (
    mainChart === "Candle" ||
    mainChart === "Area" ||
    mainChart === "Bars" ||
    mainChart === "Line"
  ) {
    calculatedData = ScaleProvider(initialData);
  }
  if (mainChart === "Heikin Ashi") {
    calculatedData = ScaleProvider(ha(initialData));
  }
  if (mainChart === "Kagi") {
    calculatedData = ScaleProvider(kagiCalculator(initialData));
  }
  if (mainChart === "Renko") {
    calculatedData = ScaleProvider(renkoCalculator(initialData));
  }
  if (mainChart === "Point & Figure") {
    calculatedData = ScaleProvider(pAndF(initialData));
  }
  data = calculatedData.data;
  xScale = calculatedData.xScale;
  xAccessor = calculatedData.xAccessor;
  displayXAccessor = calculatedData.displayXAccessor;
  return { data, xScale, xAccessor, displayXAccessor };
};
