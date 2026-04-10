const fetch = require('node-fetch');

// Returns raw daily OHLC candles for a single symbol (used by futures scanner)
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'symbol required' });

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=60d&includePrePost=false`;

  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
      timeout: 8000,
    });

    if (!r.ok) return res.status(502).json({ error: `Yahoo returned ${r.status}` });

    const json  = await r.json();
    const result = json?.chart?.result?.[0];
    if (!result) return res.status(404).json({ error: 'No data' });

    const ts = result.timestamp;
    const q  = result.indicators.quote[0];
    const candles = [];

    for (let i = 0; i < ts.length; i++) {
      if (q.open[i]==null||q.high[i]==null||q.low[i]==null||q.close[i]==null) continue;
      const date = new Date(ts[i] * 1000).toISOString().slice(0, 10);
      candles.push({ date, open: q.open[i], high: q.high[i], low: q.low[i], close: q.close[i] });
    }

    // Strip today's partial candle
    const todayStr = new Date().toISOString().slice(0, 10);
    if (candles.length > 0 && candles[candles.length - 1].date === todayStr) {
      candles.pop();
    }

    res.json(candles);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
