import {
  ema,
  stochasticOscillator,
  macd,
  rsi,
  bollingerBand,
  change,
  elderRay,
} from "react-financial-charts";

const ema20 = ema()
  .options({ windowSize: 20 })
  .merge((d, c) => {
    d.ema20 = c;
  })
  .accessor((d) => d.ema20);
const ema5 = ema()
  .options({ windowSize: 5 })
  .merge((d, c) => {
    d.ema5 = c;
  })
  .accessor((d) => d.ema5);
const ema10 = ema()
  .options({ windowSize: 10 })
  .merge((d, c) => {
    d.ema10 = c;
  })
  .accessor((d) => d.ema10);
const ema15 = ema()
  .options({ windowSize: 15 })
  .merge((d, c) => {
    d.ema15 = c;
  })
  .accessor((d) => d.ema15);
const ema25 = ema()
  .options({ windowSize: 25 })
  .merge((d, c) => {
    d.ema25 = c;
  })
  .accessor((d) => d.ema25);
const ema30 = ema()
  .options({ windowSize: 30 })
  .merge((d, c) => {
    d.ema30 = c;
  })
  .accessor((d) => d.ema30);
const ema35 = ema()
  .options({ windowSize: 35 })
  .merge((d, c) => {
    d.ema35 = c;
  })
  .accessor((d) => d.ema35);
const ema40 = ema()
  .options({ windowSize: 40 })
  .merge((d, c) => {
    d.ema40 = c;
  })
  .accessor((d) => d.ema5);
const ema55 = ema()
  .options({ windowSize: 55 })
  .merge((d, c) => {
    d.ema55 = c;
  })
  .accessor((d) => d.ema55);
const ema45 = ema()
  .options({ windowSize: 45 })
  .merge((d, c) => {
    d.ema45 = c;
  })
  .accessor((d) => d.ema45);
const ema60 = ema()
  .options({ windowSize: 60 })
  .merge((d, c) => {
    d.ema60 = c;
  })
  .accessor((d) => d.ema60);
const ema65 = ema()
  .options({ windowSize: 65 })
  .merge((d, c) => {
    d.ema65 = c;
  })
  .accessor((d) => d.ema65);
const ema70 = ema()
  .options({ windowSize: 70 })
  .merge((d, c) => {
    d.ema70 = c;
  })
  .accessor((d) => d.ema70);
const ema75 = ema()
  .options({ windowSize: 75 })
  .merge((d, c) => {
    d.ema75 = c;
  })
  .accessor((d) => d.ema75);
const ema80 = ema()
  .options({ windowSize: 80 })
  .merge((d, c) => {
    d.ema80 = c;
  })
  .accessor((d) => d.ema80);
const ema85 = ema()
  .options({ windowSize: 85 })
  .merge((d, c) => {
    d.ema85 = c;
  })
  .accessor((d) => d.ema85);
const ema90 = ema()
  .options({ windowSize: 90 })
  .merge((d, c) => {
    d.ema90 = c;
  })
  .accessor((d) => d.ema90);
const ema95 = ema()
  .options({ windowSize: 95 })
  .merge((d, c) => {
    d.ema95 = c;
  })
  .accessor((d) => d.ema95);
const ema50 = ema()
  .options({ windowSize: 50 })
  .merge((d, c) => {
    d.ema50 = c;
  })
  .accessor((d) => d.ema50);
const ema100 = ema()
  .options({ windowSize: 100 })
  .merge((d, c) => {
    d.ema100 = c;
  })
  .accessor((d) => d.ema100);
export const bbCalculator = bollingerBand()
  .merge((d, c) => {
    d.bb = c;
  })
  .accessor((d) => d.bb);
export const emaCalculator = (data) => {
  return ema5(
    ema10(
      ema15(
        ema20(
          ema25(
            ema30(
              ema35(
                ema40(
                  ema45(
                    ema50(
                      ema55(
                        ema60(
                          ema65(
                            ema70(
                              ema75(ema80(ema85(ema90(ema95(ema100(data))))))
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};
export const stoCalculator = stochasticOscillator()
  .options({ windowSize: 14, kWindowSize: 1, dWindowSize: 3 })
  .merge((d, c) => {
    d.fastSTO = c;
  })
  .accessor((d) => d.fastSTO);
export const macdCalculator = macd()
  .options({
    fast: 12,
    signal: 9,
    slow: 26,
  })
  .merge((d, c) => {
    d.macd = c;
  })
  .accessor((d) => d.macd);
export const rsiCalculator = rsi()
  .options({ windowSize: 14 })
  .merge((d, c) => {
    d.rsi = c;
  })
  .accessor((d) => d.rsi);
export const emasFunctions = () => {
  return [
    ema5,
    ema10,
    ema15,
    ema20,
    ema25,
    ema30,
    ema35,
    ema40,
    ema45,
    ema50,
    ema55,
    ema60,
    ema65,
    ema70,
    ema75,
    ema80,
    ema85,
    ema90,
    ema95,
    ema100,
  ];
};
export const elderRayCalculator = (data) => {
  const elder = elderRay();
  const changeCalculator = change();
  return changeCalculator(elder(data));
};
