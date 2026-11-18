import React, { useEffect, useRef, useState } from 'react';

const markets = [

  { name: 'NASDAQ 100', symbol: 'USTEC', tv: 'FOREXCOM:NSXUSD' },

  { name: 'GOLD', symbol: 'XAUUSD', tv: 'OANDA:XAUUSD' },

  { name: 'EUR/USD', symbol: 'EURUSD', tv: 'FX:EURUSD' },

  { name: 'GBP/USD', symbol: 'GBPUSD', tv: 'FX:GBPUSD' }

];

function TradingViewWidget({ src, config, height }) {

  const container = useRef(null);

  const settings = JSON.stringify(config);

  useEffect(() => {

    const element = container.current;

    if (!element) return;

    element.innerHTML = '';

    const widget = document.createElement('div');

    widget.className = 'tradingview-widget-container__widget';

    widget.style.width = '100%';

    widget.style.height = '100%';

    const script = document.createElement('script');

    script.src = src;

    script.async = true;

    script.type = 'text/javascript';

    script.textContent = settings;

    element.appendChild(widget);

    element.appendChild(script);

    return () => {

      element.innerHTML = '';

    };

  }, [src, settings]);

  return (

    <div

      ref={container}

      className="tradingview-widget-container"

      style={{ width: '100%', height }}

    />

  );

}

const tickerConfig = {

  colorTheme: 'dark',

  isTransparent: true,

  showSymbolLogo: true,

  displayMode: 'adaptive',

  locale: 'en',

  symbols: [

    { proName: 'FOREXCOM:NSXUSD', title: 'NASDAQ 100' },

    { proName: 'OANDA:XAUUSD', title: 'GOLD' },

    { proName: 'FX:EURUSD', title: 'EUR/USD' },

    { proName: 'FX:GBPUSD', title: 'GBP/USD' }

  ]

};

const calendarConfig = {

  colorTheme: 'dark',

  isTransparent: true,

  width: '100%',

  height: '550',

  locale: 'en',

  importanceFilter: '-1,0,1',

  currencyFilter: 'USD,EUR,GBP'

};

function App() {

  const [refreshKey, setRefreshKey] = useState(0);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setRefreshKey(value => value + 1);

      setLastUpdated(new Date());

    }, 60000);

    return () => clearInterval(timer);

  }, []);

  const refreshDashboard = () => {

    setRefreshKey(value => value + 1);

    setLastUpdated(new Date());

  };

  return (

    <div className="app">

      <header className="topbar">

        <div className="brand">

          <span className="brand-icon">M</span>

          <div>

            <h1>MarketPulse</h1>

            <p>MARKET INTELLIGENCE</p>

          </div>

        </div>

        <span className="live-status">● SYSTEM ONLINE</span>

      </header>

      <main className="dashboard">

        <section className="welcome">

          <p className="eyebrow">YOUR MARKET COMMAND CENTRE</p>

          <h2>Market overview</h2>

          <p>

            Monitor global markets, economic events

            and market conditions.

          </p>

          <div className="refresh-bar">

            <span>

              Dashboard check: 60 seconds

            </span>

            <button onClick={refreshDashboard}>

              ↻ Refresh

            </button>

          </div>

          <small className="updated">

            Last dashboard refresh: {lastUpdated.toLocaleTimeString('en-ZA', {

              hour: '2-digit',

              minute: '2-digit',

              second: '2-digit'

            })}

          </small>

        </section>

        <section className="stats">

          <article className="stat-card">

            <span>Markets tracked</span>

            <strong>04</strong>

            <small>Monitored instruments</small>

          </article>

          <article className="stat-card">

            <span>Active alerts</span>

            <strong>00</strong>

            <small>No alert rules configured</small>

          </article>

          <article className="stat-card">

            <span>Market data</span>

            <strong className="status-text">TV</strong>

            <small>TradingView feed</small>

          </article>

        </section>

        <section className="panel">

          <div className="section-heading">

            <div>

              <h3>Market watchlist</h3>

              <p>Market prices and daily movements</p>

            </div>

            <span className="tag">LIVE FEED</span>

          </div>

          <div className="instrument-list">

            {markets.map(market => (

              <div className="market-row" key={market.symbol}>

                <div>

                  <strong>{market.name}</strong>

                  <small>{market.symbol}</small>

                </div>

                <a

                  href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(market.tv)}`}

                  target="_blank"

                  rel="noreferrer"

                >

                  View chart ↗

                </a>

              </div>

            ))}

          </div>

          <div className="ticker-container" key={`ticker-${refreshKey}`}>

            <TradingViewWidget

              src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"

              config={tickerConfig}

              height="90px"

            />

          </div>

          <p className="provider-note">

            Market data powered by TradingView.

            Availability and delays depend on the instrument.

          </p>

        </section>

        <section className="panel">

          <div className="section-heading">

            <div>

              <h3>Economic calendar</h3>

              <p>Upcoming market-moving fundamentals</p>

            </div>

            <span className="tag">UPCOMING</span>

          </div>

          <div className="calendar-info">

            <strong>Global economic events</strong>

            <p>

              Monitor announcements affecting USD, EUR

              and GBP, including their expected impact.

            </p>

          </div>

          <div

            className="calendar-widget"

            key={`calendar-${refreshKey}`}

          >

            <TradingViewWidget

              src="https://s3.tradingview.com/external-embedding/embed-widget-events.js"

              config={calendarConfig}

              height="570px"

            />

          </div>

          <p className="provider-note">

            Calendar supplied by TradingView.

            Check the displayed timezone before relying

            on an event's release time.

          </p>

        </section>

        <section className="panel">

          <div className="section-heading">

            <div>

              <h3>Market intelligence</h3>

              <p>Market monitoring and educational analysis</p>

            </div>

            <span className="tag">PHASE 2</span>

          </div>

          <div className="empty-state">

            <span>◎</span>

            <strong>Intelligence engine pending</strong>

            <p>

              Market sentiment, volatility monitoring,

              technical context and market summaries

              will be introduced in the next development stage.

            </p>

          </div>

        </section>

        <section className="panel">

          <h3>Alert centre</h3>

          <div className="empty-state">

            <span>♧</span>

            <strong>Alert centre ready</strong>

            <p>

              Price-condition and economic-event

              notifications will be added in the next stage.

            </p>

          </div>

        </section>

        <footer>

          MarketPulse © 2026 · Market intelligence platform

          <p>

            Educational monitoring platform · Not financial advice

          </p>

        </footer>

      </main>

    </div>

  );

}

export default App;