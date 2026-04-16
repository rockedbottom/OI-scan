const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Attempt live fetch from NASDAQ screener
  let tickers = [];
  const exchanges = ['nasdaq', 'nyse', 'amex'];
  for (const exchange of exchanges) {
    try {
      const r = await fetch(
        `https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=10000&exchange=${exchange}&download=true`,
        { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }, timeout: 5000 }
      );
      if (r.ok) {
        const json = await r.json();
        const rows = json?.data?.table?.rows || [];
        for (const row of rows) {
          const t = row.symbol;
          if (t && !t.includes('/') && !t.includes('^') && !t.includes('~') && t.length <= 5)
            tickers.push(t.replace('.', '-'));
        }
      }
    } catch(e) { /* ignore */ }
  }

  tickers = [...new Set(tickers)];

  // Fall back to hardcoded list if live fetch fails
  if (tickers.length < 500) {
    tickers = TICKERS;
  }

  res.json({ tickers, total: tickers.length });
};

const TICKERS = [
  "AAPL","MSFT","AMZN","NVDA","GOOGL","GOOG","META","TSLA","BRK-B","LLY","UNH","JPM",
  "V","XOM","AVGO","PG","MA","HD","COST","MRK","JNJ","ABBV","CVX","CRM",
  "BAC","AMD","PEP","TMO","NFLX","KO","WMT","ADBE","MCD","CSCO","ACN","LIN",
  "ABT","DHR","TXN","WFC","PM","NEE","ORCL","MS","RTX","SPGI","AMGN","UNP",
  "HON","IBM","INTU","ISRG","GE","CAT","NOW","BKNG","AXP","SYK","BLK","ELV",
  "MDT","VRTX","TJX","GS","ADI","DE","PLD","CI","SBUX","MMC","MDLZ","CB",
  "ADP","REGN","LRCX","GILD","ETN","PANW","MO","SO","DUK","BSX","ZTS","SHW",
  "CME","CL","EQIX","TGT","MCO","AON","APH","KLAC","HUM","ICE","NOC","SNPS",
  "CDNS","FI","PGR","ITW","EMR","MAR","CEG","PSA","COF","NSC","USB","WM",
  "GD","F","HCA","ECL","FCX","OXY","TFC","CARR","EW","APD","MPC","PH",
  "CCI","WELL","CTAS","ORLY","AJG","MSI","PCAR","AFL","SRE","DLR","PSX","NEM",
  "GM","GWW","TRV","AIG","EXC","VLO","BDX","AKAM","KMB","ROST","HLT","PAYX",
  "MCHP","STZ","ODFL","AEP","FAST","EA","KEYS","HSY","HES","ROP","GLW","HAL",
  "EFX","XEL","KR","DOW","WEC","PPG","LHX","IT","LMT","IQV","VRSK","MNST",
  "MPWR","FTNT","CBRE","GIS","GEHC","OTIS","RSG","URI","CTSH","ETR","DTE","FE",
  "PCG","ES","IDXX","BIIB","ALGN","ADSK","ABNB","DDOG","ZS","CRWD","TEAM","WDAY",
  "OKTA","MDB","SNOW","MRVL","ON","ENPH","TTD","UBER","DASH","NET","ROKU","VEEV",
  "PAYC","HUBS","COIN","RBLX","PINS","LYFT","HOOD","SHOP","SQ","PYPL","INTC","QCOM",
  "MU","AMAT","ASML","TSM","SAP","ZM","DOCU","TWLO","BILL","GTLB","CFLT","SMAR",
  "PCTY","APPF","FIVN","ESTC","PTC","ANSS","MANH","TOST","BRZE","ASAN","MNDY","APP",
  "ARM","SMCI","DELL","HPQ","HPE","NTAP","STX","WDC","PSTG","NTNX","NCNO","CDAY",
  "GWRE","SPSC","PCOR","JAMF","APPN","ALRM","FOUR","CLFD","HLIT","FFIV","JNPR","NTCT",
  "BAND","RDDT","SNAP","MTTR","AI","BBAI","SOUN","GFAI","IREN","CORZ","HUT","MARA",
  "RIOT","CLSK","BTBT","BTCS","WULF","CIFR","BTDR","AULT","C","SCHW","AMP","RJF",
  "STT","BK","MTB","RF","CFG","HBAN","KEY","FITB","ZION","CMA","EWBC","BOKF",
  "WTFC","IBOC","TOWN","FULT","WSFS","FFIN","CVBF","UMBF","WAFD","NYCB","DCOM","BHLB",
  "NBT","TRMK","PNFP","PPBI","SFNC","VBTX","TCBK","HTLF","SASR","SBCF","SFBS","STBA",
  "UCBI","VLY","WABC","WASH","WBS","MET","PRU","ALL","HIG","WRB","ACGL","RNR",
  "RE","ERIE","MKL","BRO","RYAN","LPLA","SF","ARES","APO","KKR","BX","CG",
  "TPG","STEP","VRTS","APAM","BSIG","CNS","OBDC","OCSL","PFLT","PSEC","TCPC","AFRM",
  "UPST","LC","SOFI","OPFI","CACC","OMF","WRLD","PRAA","ECPG","SLM","NAVI","NMIH",
  "ESNT","MGIC","RDN","MTG","BFAM","GPN","FIS","FISV","WEX","EVO","EVTC","I",
  "PAYO","FLYW","PFE","BMY","MRNA","BNTX","ALNY","INCY","BMRN","IONS","EXEL","RARE",
  "FOLD","ACAD","PRGO","JAZZ","CRNX","KRTX","ARQT","IMVT","KROS","NVCR","PTCT","RCUS",
  "RPRX","SRPT","TPTX","XNCR","ZLAB","LEGN","KYMR","KRYS","RVMD","NRXP","NKTX","NTLA",
  "NUVL","NVAX","NVOS","NVST","NXGN","CVS","CNC","MOH","OSCR","HQY","PGNY","A",
  "BIO","ILMN","HOLX","HSIC","STE","WAT","MTD","CRL","BAX","INSP","ITGR","LMAT",
  "MMSI","NVT","OMCL","OSUR","PDCO","RGEN","RVNC","SGEN","SNN","SRDX","TELA","TNDM",
  "UTMD","VCEL","VCYT","NEOG","ICLR","MEDP","ICON","SYNH","CHNG","ACCD","AMWL","DOCS",
  "HIMS","TDOC","ONEM","PHGP","COP","EOG","PXD","DVN","MRO","APA","FANG","SLB",
  "BKR","NOV","RIG","VAL","PTEN","HP","WHD","LBRT","NE","DK","PBF","CLMT",
  "PARR","DINO","CVI","KMI","WMB","OKE","EPD","ET","MPLX","PAA","PAGP","TRGP",
  "AM","EQT","RRC","AR","SWN","CTRA","CHK","SM","CLR","PDCE","CPE","MTDR",
  "ESTE","CRGY","BRY","TALO","SBOW","CIVI","MNRL","PHX","VVV","TDW","KOS","CNX",
  "LNG","CQP","GLNG","NFE","TELL","NEXT","USAC","SFM","GO","CASY","YUM","QSR",
  "DPZ","PZZA","JACK","SHAK","DENN","TXRH","BJRI","EAT","NKE","LULU","PVH","RL",
  "TPR","VFC","HBI","UA","SKX","CROX","ONON","DECK","BOOT","BURL","PLNT","ASO",
  "HIBB","FIVE","OLLI","DIS","CMCSA","CHTR","PARA","WBD","FOX","NYT","OMC","IPG",
  "DKNG","PENN","MGM","WYNN","LVS","CZR","BYD","CHDN","GDEN","RCL","CCL","NCLH",
  "ONEW","HZO","BC","MBUU","PATK","LCII","STLA","RIVN","LCID","NIO","LI","XPEV",
  "AZO","AAP","GPC","LKQ","MNRO","PAG","LAD","AN","KMX","CVNA","POOL","SWK",
  "SNA","PII","HOG","WGO","THO","CWH","HAS","MAT","PLAY","FUN","SIX","LESL",
  "SPWH","BGFV","YETI","BIRD","K","CPB","SJM","CAG","MKC","HRL","LANC","JJSF",
  "HAIN","COTY","EL","ULTA","CLX","CHD","ENR","SPB","WDFC","WBA","RAD","DG",
  "DLTR","BJ","WEIS","UNFI","USFD","PFGC","MMM","ROK","DOV","AME","XYL","GNRC",
  "IR","TT","JCI","ALLE","FTV","MIDD","TDG","HEI","TXT","BA","KTOS","PLTR",
  "UPS","FDX","SAIA","JBHT","CHRW","XPO","GXO","WERN","HTLD","MRTN","HUBG","SNDR",
  "CVLG","ECHO","FWRD","DAL","UAL","AAL","LUV","ALK","JBLU","SAVE","HA","SNCY",
  "MSM","WESCO","DNOW","DXP","MAN","RHI","ASGN","KFRC","KELYA","CDW","SAIC","LDOS",
  "BAH","CACI","HII","MANT","RPM","FMC","MOS","CF","NTR","SMG","ALB","SQM",
  "LAC","PLL","LTHM","CMC","NUE","STLD","RS","WOR","KALU","CENX","AA","GOLD",
  "KGC","AEM","WPM","PAAS","HL","EXK","CDE","AG","MP","SSRM","SILV","CLF",
  "MT","X","VALE","RIO","SCCO","TECK","ARCH","HCC","BTU","ARLP","CC","EMN",
  "HUN","KRO","TROX","WLK","OLN","GRA","HWKN","IOSP","WY","PCH","RYAM","AMT",
  "EQR","AVB","ESS","MAA","UDR","CPT","REG","FRT","SPG","O","NNN","STAG",
  "IIPR","VICI","MPW","SBRA","PEAK","DOC","HR","EPRT","REXR","EXR","CUBE","LSI",
  "NSA","COLD","AMH","INVH","IRT","AIRC","VNO","SLG","BXP","LXP","KRG","ROIC",
  "SITC","UE","ACC","GEO","CXW","CTRE","LTC","CHCT","GMRE","DHC","DEA","EIX",
  "CMS","NI","AES","CNP","OGE","PNW","IDA","AVA","POR","NWE","OTTR","ALE",
  "MGEE","SJI","BKH","CPK","AWK","CWT","YORW","MSEX","ARTNA","D","AEE","LNT",
  "EVRG","AGR","PNM","CELH","DUOL","ASTS","RKLB","JOBY","ACHR","EVGO","CHPT","BLNK",
  "PLUG","FCEL","BE","OPEN","RDFN","Z","EXPI","PTON","LMND","ROOT","JOANN","BIGC",
  "RELY","ACMR","COHU","FORM","ICHR","KLIC","MKSI","ONTO","UCTT","VECO","WOLF","ALGM",
  "AMBA","AOSL","DIOD","SLAB","SMTC","SITM","ALAB","CRUS","MTSI","RMBS","SIMO","SSYS",
  "DDD","IRBT","CGNX","IPGP","COHR","LITE","NPKI","OCLR","VIAV","INFN","CALX","UBNT",
  "CASA","NTGR","SMTX","COMM","EXTR","ZIXI","LPSN","REAL","RVLV","PRPL","CURV","GIII",
  "DXLG","TLYS","EXPR","CATO","PLCE","GOOS","MOV","FOSL","SIG","TIF","ZALES","BIRK",
  "CPRI","SHOO","SCVL","CBRL","DINE","LOCO","NATH","RRGB","RAVE","CHUY","DNKN","FAT",
  "FRGI","KRUS","NDLS","NXST","PBPB","PTGX","RICK","RUTH","SONC","STKS","TAST","UEIC",
  "WING","WSBC","WTBA","WVFC","WYND","XELA","XERS","XFOR","XGTY","XILI","XOMA","XONE",
  "XPEL","XPER","XPOF","XPRO","XRAY","XREX","XRNG","XRTX","XTIA","XTLB","XWEL","XXII",
  "XYLD","XYLO","XYREM","XYLM","YELL","YELP","YEXT","YMM","YMAB","YNAB","YRCW","YSX",
  "YTFD","YTRA","ZEAL","ZEUS","ZG","ZGN","ZI","ZIOP","ZJK","ZKH","ZL","ZLS",
  "ZNH","ZNTL","ZOM","ZSAN","ZTO","ZUMZ","ZUO","ZVZZT", "PL"
];
