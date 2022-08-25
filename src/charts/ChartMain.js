import { useEffect } from "react";
import { useState, useReducer } from "react";
import ChartComponent from "./ChartComponent";
import "./ChartMain.css";
import Dropdown from "./Dropdown";
import { types, map, indicators } from "./Type";
import IndicatorSelector from "./IndicatorSelector/IndicatorSelector";
import ChartDropDown from "./Dropdowns/ChartDropDown";
import io from "socket.io-client";
import { initialIndicatorState } from "./Type";
import { heightreducer } from "./heightreducer";
import Axios from "../Request/Axios";
const ChartMain = () => {
  const [list, setList] = useState([]);
  // let socketSymbol = [];
  const [chart, setChart] = useState("MARUTI.NS");
  // const [tickerSymbol, setTickerSymbol] = useState([]);
  const [activesymbol, setActivesymbol] = useState("MARUTI");
  const [openIndicator, setOpenIndicator] = useState(false);
  const [initialData, setinitialData] = useState([]);
  const [priceSocket, setPriceSocket] = useState([]);
  const [percentSocket, setPercentSocket] = useState([]);
  const [mainChart, setMainChart] = useState("Candle");
  const [indicatorState, dispatch] = useReducer(
    heightreducer,
    initialIndicatorState
  );
  const url = "https://backendtrading.herokuapp.com";
  // const url = 'http://localhost:5000/';
  const socket = io(url, {
    transports: ["websocket", "polling"],
  });
  useEffect(() => {
    socket.on("symbol", (stockPrice) => {
      setPriceSocket(stockPrice?.price);
      setPercentSocket(stockPrice?.percent);
    });
  }, []);

  useEffect(() => {
    const getdata = async (symbol) => {
      let response = await Axios.get("/history/" + symbol);

      setinitialData(response.data.result);
    };
    getdata(chart);
  }, [chart]);
  useEffect(() => {
    setList([getlist("NIFTY 50")]);
  }, []);
  const getlist = (type, label) => {
    if (type === "Crypto") {
      setList([
        "Bitcoin USD",
        "Ethereum USD",
        "Dogecoin USD",
        "Binance Coin USD",
      ]);
      socket.emit(
        "data",
        ["Bitcoin USD", "Ethereum USD", "Dogecoin USD", "Binance Coin USD"],
        (price) => {
          console.log(price); //All Symbols
        }
      );
      setActivesymbol("Bitcoin USD");
      setChart("Bitcoin USD");
      return;
    }
    Axios.get(`/catagory/${type.toUpperCase()}`).then((response) => {
      setList(response.data.list);
      setActivesymbol(response.data.list[1]);
      setChart(response.data.list[1] + ".NS");

      //socket sending the smbols to the backend to fetch price from yahoo api
      socket.emit("data", response.data.list, (price) => {});
    });
  };
  const handleIndicatorOpen = () => {
    setOpenIndicator((prev) => !prev);
  };
  const handleIndicatorsChange = (indicator, option) => {
    if (option) {
      dispatch({ type: "add", indicator: indicator });
    } else {
      dispatch({ type: "delete", indicator: indicator });
    }
  };

  // setInterval(() => {
  //   console.log(list.length);
  //   socket.send('data', list, (price) => {
  //     // console.log(price); //All Symbols
  //   });
  // }, 5000);
  // useEffect(() => {}, []);
  let style = { marginBottom: `${indicatorState.height - 400}px` };
  return (
    <>
      <div className="chart-main">
        <div className="container-top">
          <div className="dropdown-container">
            <Dropdown
              onClick={getlist}
              list={types.slice(0, 6)}
              label="Indices Category"
            />
            <Dropdown
              onClick={getlist}
              list={types.slice(6, 26)}
              label="Sectoral Indices"
            />
            <Dropdown onClick={getlist} list={types.slice(26)} label="Others" />
            <Dropdown
              onClick={getlist}
              list={["Crypto"]}
              setChart={setChart}
              label="Crypto"
            />
          </div>
        </div>
        <div className="stock" style={style}>
          <div className="stock-lists">
            <ul className="stock-list-items">
              {list.map((symbol, i) => {
                return (
                  <li
                    key={i}
                    className={`stock-item ${
                      symbol === activesymbol ? "stock-item-active" : ""
                    }`}
                    onClick={() => {
                      if (map[symbol]) setChart(map[symbol]);
                      else setChart(symbol + ".NS");
                      setActivesymbol(symbol);
                    }}
                  >
                    <div className="single-cell">
                      <div className="stock-symbol"> {symbol}</div>
                      <div className="stock-parameter">
                        <h6 className="font-bold text-left">
                          {priceSocket[list.indexOf(symbol)]
                            ? priceSocket[list.indexOf(symbol)]
                            : "N/A"}
                        </h6>
                        <h6 className="text-left">
                          {percentSocket[list.indexOf(symbol)]
                            ? percentSocket[list.indexOf(symbol)]
                            : "N/A"}
                        </h6>
                      </div>{" "}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="chart-section">
            <div className="indicator-menu">
              <ChartDropDown setMainChart={setMainChart} />
              <IndicatorSelector
                openIndicators={openIndicator}
                handleIndicatorsClose={handleIndicatorOpen}
                selectedIndicators={indicatorState.indicators}
                handleIndicatorsChange={handleIndicatorsChange}
                indicators={indicators}
              />
            </div>
            {chart && (
              <ChartComponent
                indicatorState={indicatorState}
                initialData={initialData}
                mainChart={mainChart}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartMain;
