const fetch = require('node-fetch');

async function fetchOHLC(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=90d`;
  const r = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    timeout: 8000,
  });
  if (!r.ok) return null;
  const json = await r.json();
  const result = json?.chart?.result?.[0];
  if (!result) return null;

  const ts = result.timestamp;
  const q  = result.indicators.quote[0];
  const candles = [];
  for (let i = 0; i < ts.length; i++) {
    if (q.open[i]==null||q.high[i]==null||q.low[i]==null||q.close[i]==null) continue;
    candles.push({
      date:  new Date(ts[i]*1000).toISOString().slice(0,10),
      open:  q.open[i], high: q.high[i], low: q.low[i], close: q.close[i],
    });
  }
  return candles;
}

function detectPattern(candles, minPrice) {
  if (!candles || candles.length < 52) return null;

  const last = candles[candles.length - 1];
  if (last.close < minPrice) return null;

  // Reject if the most recent candle is more than 5 days old
  const lastDate = new Date(last.date);
  const today = new Date();
  const diffDays = (today - lastDate) / (1000 * 60 * 60 * 24);
  if (diffDays > 5) return null;

  const sma50 = candles.slice(-50).reduce((s,c) => s + c.close, 0) / 50;
  if (last.close <= sma50) return null;

  const base = candles[candles.length - 3];
  const out  = candles[candles.length - 2];
  const ins  = candles[candles.length - 1];

  const isOutside = out.high > base.high && out.low < base.low;
  const isInside  = ins.high < out.high  && ins.low  > out.low;
  if (!isOutside || !isInside) return null;

  const outRange = out.high - out.low;
  const insRange = ins.high - ins.low;
  const ratio    = outRange > 0 ? insRange / outRange : 1;
  const bias     = ins.close > ins.open ? 'bullish' : ins.close < ins.open ? 'bearish' : 'neutral';
  const pctAbove = ((last.close - sma50) / sma50 * 100).toFixed(1);

  return {
    outsideDate: out.date, insideDate: ins.date,
    close: last.close.toFixed(2), sma50: sma50.toFixed(2),
    pctVsSma: '+' + pctAbove + '%', bias,
    rangeRatio: ratio.toFixed(3),
    outRange: `${out.low.toFixed(2)}-${out.high.toFixed(2)}`,
    inRange:  `${ins.low.toFixed(2)}-${ins.high.toFixed(2)}`,
  };
}



module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { tickers = [], minPrice = 10, bias = 'all' } = req.body;

  // Process 50 tickers concurrently — fast enough to stay under Vercel's 10s limit
  const CONCURRENCY = 50;
  const hits = [];
  let errors = 0;

  for (let i = 0; i < tickers.length; i += CONCURRENCY) {
    const chunk = tickers.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      chunk.map(async (ticker) => {
        const candles = await fetchOHLC(ticker);
        const match   = detectPattern(candles, minPrice);
        if (match && (bias === 'all' || match.bias === bias)) {
          return { ticker, data: match };
        }
        return null;
      })
    );
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value) hits.push(r.value);
      else if (r.status === 'rejected') errors++;
    }
  }

  hits.sort((a,b) => parseFloat(a.data.rangeRatio) - parseFloat(b.data.rangeRatio));
  res.json({ hits, scanned: tickers.length, errors, asOf: new Date().toISOString() });
};
