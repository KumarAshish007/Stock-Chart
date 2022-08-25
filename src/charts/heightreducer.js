/*
{
    indicators:[],
    macd:400,
    ema:200.
}


*/
import { height_map, mainChartindicators } from "./Type";
export const heightreducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "add":
      newState = {
        ...state,
        indicators: [...state.indicators, action.indicator],
        height: state.height + height_map[action.indicator],
      };
      for (let i = 0; i < newState.indicators.length; i++) {
        if (i === 0) {
          newState[newState.indicators[i]] = 0;
        } else {
          newState[newState.indicators[i]] =
            newState[newState.indicators[i - 1]] +
            height_map[newState.indicators[i - 1]];
        }
      }
      break;
    case "delete":
      newState = {
        ...state,
        indicators: state.indicators.filter((val) => val !== action.indicator),
        height: state.height - height_map[action.indicator],
      };
      for (let i = 0; i < newState.indicators.length; i++) {
        if (i === 0) {
          newState[newState.indicators[i]] = 0;
        } else {
          newState[newState.indicators[i]] =
            newState[newState.indicators[i - 1]] +
            height_map[newState.indicators[i - 1]];
        }
      }
      break;
    default:
      return state;
  }
  let bottom = "mainChart";
  for (let i = newState.indicators.length - 1; i >= 0; i--) {
    if (!mainChartindicators[newState.indicators[i]]) {
      bottom = newState.indicators[i];
      break;
    }
  }
  newState.bottom = bottom;
  return newState;
};
