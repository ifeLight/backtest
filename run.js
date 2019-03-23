const Backtest = require('./lib');
let candles = require('./BTC_1H_CANDLES.json');
let signals = require('./signals');
signals = Object.values(signals[0]);
const signalsMap = {};
signals.forEach((d) => {
	signalsMap[d.date] = d;
});

const backtesting = new Backtest(candles, signalsMap);
const result = backtesting.start();

const Chart = require('cli-chart');
const chart = new Chart({
    xlabel: 'trades',
    ylabel: 'usd',
    direction: 'y',
    width: result.trades.length,
    height: 35,
    lmargin: 5,
    step: 1
});
result.trades.forEach((trade, index) => {
	chart.addBar(trade.amount + trade.profit, trade.profit > 0 ? 'green' : 'red');
});

chart.draw();
process.exit();
