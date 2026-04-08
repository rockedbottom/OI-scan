const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const sources = [
    'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=8000&exchange=nasdaq&download=true',
    'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=8000&exchange=nyse&download=true',
    'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=8000&exchange=amex&download=true',
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    'Accept': 'application/json',
  };

  let tickers = [];

  for (const url of sources) {
    try {
      const r = await fetch(url, { headers });
      if (!r.ok) continue;
      const json = await r.json();
      const rows = json?.data?.table?.rows || [];
      for (const row of rows) {
        const t = row.symbol;
        if (t && !t.includes('/') && !t.includes('^') && t.length <= 5) {
          tickers.push(t.replace('.', '-'));
        }
      }
    } catch (e) {
      console.error('Ticker source failed:', url, e.message);
    }
  }

  // Deduplicate
  tickers = [...new Set(tickers)];

  if (tickers.length < 10) {
    // Fallback
    tickers = FALLBACK;
  }

  res.json({ tickers, total: tickers.length });
};

const FALLBACK = [
  "AAPL","MSFT","AMZN","NVDA","GOOGL","META","TSLA","BRK-B","UNH","LLY",
  "JPM","V","XOM","AVGO","PG","MA","HD","COST","MRK","JNJ","ABBV","CVX",
  "CRM","BAC","AMD","PEP","TMO","NFLX","KO","WMT","ADBE","MCD","CSCO",
  "ACN","LIN","ABT","DHR","TXN","WFC","PM","NEE","ORCL","MS","RTX","SPGI",
  "AMGN","UNP","HON","IBM","INTU","ISRG","GE","CAT","NOW","BKNG","AXP",
  "SYK","BLK","ELV","MDT","VRTX","TJX","GS","ADI","DE","PLD","CI","SBUX",
  "MMC","MDLZ","CB","ADP","REGN","LRCX","GILD","ETN","PANW","MO","SO","DUK",
  "BSX","ZTS","SHW","CME","CL","EQIX","TGT","MCO","AON","APH","KLAC","HUM",
  "ICE","NOC","SNPS","CDNS","FI","PGR","ITW","EMR","MAR","CEG","PSA","COF",
  "NSC","USB","WM","GD","F","HCA","ECL","FCX","OXY","TFC","CARR","EW","AKAM",
  "APD","MPC","PH","CCI","WELL","CTAS","ORLY","AJG","MSI","PCAR","AFL",
  "SRE","DLR","PSX","NEM","GM","GWW","TRV","AIG","EXC","VLO","BDX",
  "ADSK","ABNB","DDOG","ZS","CRWD","TEAM","WDAY","OKTA","MDB","SNOW",
  "MRVL","ON","ENPH","TTD","UBER","DASH","NET","ROKU","VEEV","PAYC",
  "HUBS","COIN","RBLX","PINS","LYFT","HOOD","SHOP","SQ","PYPL","INTC",
  "QCOM","MU","AMAT","TSMC","NKE","LULU","FDX","UPS","DAL","UAL","AAL"
];
