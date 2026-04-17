const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

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

  // Always merge with our curated list to ensure these are always scanned
  const merged = [...new Set([...tickers, ...TICKERS])];
  const result = merged.filter(t => t && t.length <= 5 && !t.includes('/') && !t.includes('^'));

  res.json({ tickers: result, total: result.length });
};

const TICKERS = [
  "A","AA","AAL","AAOI","AAP","AAPL","ABAT","ABBV","ABNB","ABT","ACAD","ACC",
  "ACCD","ACGL","ACHR","ACMR","ACN","ADBE","ADI","ADM","ADMA","ADNT","ADP","ADSK",
  "AEE","AEHR","AEIS","AEM","AEP","AES","AFL","AFRM","AG","AGR","AI","AIG",
  "AIRC","AIRG","AJG","AKAM","ALAB","ALB","ALE","ALGM","ALGN","ALGT","ALK","ALL",
  "ALLE","ALM","ALMU","ALNY","ALRM","AM","AMAT","AMBA","AMCI","AMD","AME","AMGN",
  "AMH","AMP","AMPX","AMR","AMT","AMWL","AMZN","AN","ANAB","ANSS","AON","AOSL",
  "APA","APAM","APD","APH","APLD","APO","APP","APPF","APPN","AR","ARCH","AREC",
  "ARES","ARLP","ARM","ARQQ","ARQT","ARTNA","ARW","ASAN","ASC","ASGN","ASML","ASO",
  "ASTI","ASTS","ATEN","ATI","ATOM","ATRO","AU","AUGO","AULT","AVA","AVAV","AVB",
  "AVGO","AVT","AWK","AXP","AXSM","AXTI","AZO","BA","BAC","BAH","BALL","BAND",
  "BAX","BBAI","BC","BDC","BDX","BE","BG","BGFV","BHLB","BIGC","BIIB","BILL",
  "BIO","BIRD","BJ","BJRI","BK","BKH","BKNG","BKR","BKSY","BLDP","BLK","BLNK",
  "BMRN","BMY","BNTX","BOKF","BOOT","BRK-B","BRO","BRY","BRZE","BSIG","BSX","BTBT",
  "BTCS","BTDR","BTU","BURL","BVN","BW","BWXT","BX","BXP","BYD","C","CACC",
  "CACI","CAG","CALX","CAMT","CARR","CASA","CASY","CAT","CATO","CB","CBRE","CBRL",
  "CC","CCI","CCJ","CCL","CDAY","CDE","CDNS","CDW","CEG","CELH","CENX","CF",
  "CFG","CFLT","CG","CGNX","CHCT","CHD","CHDN","CHK","CHPT","CHRW","CHTR","CHUY",
  "CI","CIEN","CIFR","CIVI","CL","CLF","CLFD","CLMT","CLR","CLS","CLSK","CLX",
  "CMA","CMC","CMCSA","CME","CMRE","CMS","CNC","CNP","CNS","CNX","CODA","COF",
  "COHR","COHU","COIN","COLD","COMM","COP","COPX","CORZ","COST","COTY","CPA","CPB",
  "CPE","CPK","CPNG","CPT","CQP","CRCL","CRGY","CRH","CRL","CRM","CRML","CRNX",
  "CROX","CRS","CRUS","CRWD","CSCO","CSTM","CTAS","CTRA","CTRE","CTSH","CUBE","CVBF",
  "CVI","CVLG","CVNA","CVS","CVU","CVX","CW","CWH","CWT","CXW","CZR","D",
  "DAC","DAIO","DAL","DASH","DBI","DCO","DCOM","DDD","DDOG","DE","DEA","DECK",
  "DELL","DENN","DG","DHC","DHR","DHT","DIA","DINE","DINO","DIOD","DIS","DK",
  "DKNG","DLR","DLTR","DNOW","DOC","DOCN","DOCS","DOCU","DOV","DOW","DPZ","DRS",
  "DT","DTE","DUK","DUOL","DVN","DXLG","DXP","DY","EA","EAT","ECHO","ECL",
  "ECO","ECPG","EFX","EGO","EIX","EL","ELBM","ELV","EMN","EMR","ENPH","ENR",
  "ENTG","EOG","EOSE","EPD","EPRT","EQIX","EQR","EQT","ERIE","ERO","ES","ESEA",
  "ESI","ESNT","ESS","ESTC","ESTE","ET","ETN","ETR","EVGO","EVO","EVRG","EVTC",
  "EW","EWBC","EWZ","EXC","EXEL","EXK","EXPI","EXPR","EXR","EXTR","F","FANG",
  "FAST","FCEL","FCX","FDX","FE","FEIM","FFIN","FFIV","FI","FIS","FISV","FITB",
  "FIVE","FIVN","FIX","FLY","FLYW","FMC","FN","FOLD","FORM","FOUR","FOX","FPS",
  "FRO","FRT","FSLY","FTAI","FTNT","FTV","FULT","FUN","FUTU","FWRD","GD","GDEN",
  "GE","GEHC","GEO","GFAI","GFI","GFS","GH","GIII","GILD","GIS","GLD","GLNG",
  "GLW","GM","GMED","GMRE","GNK","GNRC","GO","GOLD","GOOG","GOOGL","GPC","GPN",
  "GRA","GRAB","GS","GSAT","GSIT","GSL","GTLB","GWRE","GWW","GXO","HA","HAIN",
  "HAL","HAS","HBAN","HBI","HBM","HCA","HCC","HD","HEI","HERZ","HES","HIBB",
  "HIG","HII","HIMS","HL","HLIT","HLT","HMY","HOG","HOLX","HON","HOOD","HP",
  "HPE","HPQ","HQY","HR","HRL","HSAI","HSIC","HSY","HTLD","HTLF","HUBG","HUBS",
  "HUM","HUN","HUT","HWKN","HWM","HXL","HZO","IAG","IBIT","IBM","IBOC","ICE",
  "ICHR","ICLR","ICON","IDA","IDCC","IDR","IDXX","IGV","IIPR","ILMN","IMVT","INCY",
  "INFN","INGLES","INSM","INSP","INSW","INTC","INTU","INVH","IONS","IOSP","IOT","IPG",
  "IPGP","IPX","IQV","IR","IRBT","IRDM","IREN","IRT","ISRG","ISSC","IT","ITGR",
  "ITW","IWM","JACK","JAMF","JAZZ","JBHT","JBLU","JCI","JJSF","JNJ","JNPR","JOBY",
  "JPM","K","KALU","KELYA","KEX","KEY","KEYS","KFRC","KGC","KKR","KLAC","KLIC",
  "KMB","KMI","KMT","KMX","KO","KODK","KOS","KR","KRG","KRMN","KRO","KROS",
  "KRTX","KRYS","KTOS","KYMR","LAC","LAD","LANC","LASR","LBRT","LC","LCID","LCII",
  "LDOS","LEGN","LESL","LEU","LHX","LI","LIN","LITE","LKQ","LLY","LMAT","LMND",
  "LMT","LNG","LNT","LOCO","LPLA","LPSN","LPTH","LRCX","LSCC","LSI","LTBR","LTC",
  "LTHM","LULU","LUNR","LUV","LVS","LWLG","LXP","LYFT","MA","MAA","MAN","MANH",
  "MANT","MAR","MARA","MAT","MBUU","MCD","MCHP","MCO","MDB","MDLZ","MDT","MEDP",
  "MELI","MET","META","METC","MGEE","MGIC","MGM","MIDD","MIR","MIRM","MKC","MKL",
  "MKSI","MMC","MMM","MMSI","MNDY","MNRL","MNRO","MNST","MNTS","MO","MOB","MOD",
  "MOH","MOS","MOVE","MP","MPC","MPLX","MPTI","MPW","MPWR","MRCY","MRK","MRNA",
  "MRO","MRTN","MRVL","MS","MSEX","MSFT","MSI","MSM","MT","MTB","MTD","MTDR",
  "MTG","MTRN","MTSI","MTTR","MU","MVST","MXL","NAT","NAVI","NAVN","NB","NBIS",
  "NBT","NCLH","NCNO","NDLS","NE","NEE","NEM","NEOG","NET","NEXT","NFE","NFLX",
  "NI","NIO","NKE","NMG","NMIH","NMM","NNE","NNN","NOC","NOV","NOW","NSA",
  "NSC","NTAP","NTCT","NTGR","NTNX","NTR","NTRA","NUE","NUTX","NVCR","NVDA","NVMI",
  "NVT","NVTS","NWE","NXE","NXT","NYCB","NYT","O","OBDC","OCLR","OCSL","ODFL",
  "OGE","OKE","OKLO","OKTA","OLLI","OLN","OMC","OMCL","OMF","ON","ONDS","ONEW",
  "ONON","ONTO","OPCH","OPEN","OPFI","ORCL","ORLA","ORLY","OSCR","OSUR","OTIS","OTTR",
  "OXY","PAA","PAAS","PACS","PAG","PAGP","PANW","PARA","PARR","PATK","PAYC","PAYO",
  "PAYX","PBF","PBPB","PCAR","PCG","PCH","PCOR","PCTY","PDCE","PDCO","PEAK","PENN",
  "PEP","PFE","PFGC","PFLT","PG","PGNY","PGR","PH","PHX","PII","PINS","PKE",
  "PKX","PL","PLAB","PLAY","PLD","PLL","PLNT","PLTR","PLUG","PM","PNFP","PNM",
  "PNW","POET","POOL","POR","POWL","PPBI","PPG","PPTA","PRAA","PRGO","PRPL","PRU",
  "PSA","PSEC","PSTG","PSX","PTC","PTCT","PTEN","PTON","PVH","PXD","PYPL","PZZA",
  "Q","QBTS","QCOM","QQQ","QSR","QUBT","RAD","RARE","RBLX","RCAT","RCL","RCUS",
  "RDDT","RDFN","RDN","RDW","RE","REAL","REG","REGN","REXR","RF","RGEN","RGLD",
  "RHI","RICK","RIG","RIO","RIOT","RIVN","RJF","RKLB","RL","RMBS","RNR","ROIC",
  "ROK","ROKU","ROOT","ROP","ROST","RPM","RPRX","RRC","RRGB","RS","RSG","RSP",
  "RTX","RUTH","RVLV","RVMD","RVNC","RXT","RYAM","RYAN","SAIA","SAIC","SAIL","SAP",
  "SASR","SAVE","SBCF","SBOW","SBRA","SBUX","SCCO","SCHW","SE","SEDG","SEI","SERV",
  "SF","SFBS","SFM","SFNC","SGEN","SGML","SHAK","SHOP","SHW","SIF","SILV","SIMO",
  "SITC","SITM","SIX","SJI","SJM","SKX","SKYT","SLAB","SLB","SLG","SLI","SLM",
  "SLV","SM","SMAR","SMCI","SMG","SMH","SMTC","SMTX","SNA","SNAP","SNCY","SNDK",
  "SNDR","SNN","SNOW","SNPS","SO","SOFI","SOLS","SOUN","SOXL","SPB","SPCE","SPG",
  "SPGI","SPSC","SPWH","SPY","SQ","SQM","SRDX","SRE","SRPT","SSRM","SSYS","STAG",
  "STBA","STE","STEP","STLA","STLD","STM","STNG","STRL","STT","STX","STZ","SWK",
  "SWN","SYK","SYNH","TALO","TCBK","TCPC","TDG","TDOC","TDW","TDY","TEAM","TECK",
  "TELA","TELL","TER","TEVA","TFC","TFPM","TGT","TH","THO","TJX","TLT","TMC",
  "TMDX","TMO","TNDM","TNK","TOST","TOWN","TPG","TPR","TPTX","TQQQ","TRGP","TRMD",
  "TRMK","TROX","TRV","TSEM","TSLA","TSM","TT","TTD","TTMI","TWLO","TXN","TXRH",
  "TXT","UA","UAL","UAMY","UBER","UBNT","UCBI","UCTT","UDR","UE","UEC","UI",
  "ULTA","UMBF","UNFI","UNH","UNP","UPS","UPST","URI","UROY","USAC","USB","USFD",
  "UTMD","UUUU","V","VAL","VALE","VBTX","VCEL","VCYT","VECO","VEEV","VELO","VFC",
  "VIAV","VICI","VICR","VLO","VLY","VMC","VNET","VNO","VRSK","VRSN","VRT","VRTS",
  "VRTX","VSAT","VVV","WABC","WAFD","WASH","WAT","WBA","WBD","WBS","WDAY","WDC",
  "WDFC","WEC","WEIS","WELL","WERN","WESCO","WEX","WFC","WGO","WHD","WING","WLK",
  "WM","WMB","WMT","WOLF","WOR","WPM","WRB","WRLD","WSFS","WTFC","WULF","WWD",
  "WY","WYNN","X","XEL","XLF","XNCR","XOM","XPEV","XPO","XYL","YETI","YORW",
  "YOU","YSS","YUM","Z","ZIM","ZION","ZIXI","ZLAB","ZM","ZS","ZTS"
];
