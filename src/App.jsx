import React from 'react';

const markets = [

  { name: 'NASDAQ 100', symbol: 'USTEC', status: 'Monitoring' },

  { name: 'GOLD', symbol: 'XAUUSD', status: 'Monitoring' },

  { name: 'EUR/USD', symbol: 'EURUSD', status: 'Monitoring' },

  { name: 'GBP/USD', symbol: 'GBPUSD', status: 'Monitoring' }

];

function App() {

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

          <p>Monitor markets, economic events and trading opportunities.</p>

        </section>

        <section className="stats">

          <article className="stat-card">

            <span>Markets tracked</span>

            <strong>04</strong>

            <small>Watchlist instruments</small>

          </article>

          <article className="stat-card">

            <span>Active alerts</span>

            <strong>00</strong>

            <small>No alerts triggered</small>

          </article>

          <article className="stat-card">

            <span>High impact events</span>

            <strong>--</strong>

            <small>Calendar connection pending</small>

          </article>

        </section>

        <section className="panel">

          <div className="section-heading">

            <div>

              <h3>Market watchlist</h3>

              <p>Your monitored instruments</p>

            </div>

            <span className="tag">DEMO DATA</span>

          </div>

          <div className="market-list">

            {markets.map((market) => (

              <div className="market-row" key={market.symbol}>

                <div>

                  <strong>{market.name}</strong>

                  <small>{market.symbol}</small>

                </div>

                <span className="monitoring">

                  {market.status}

                </span>

              </div>

            ))}

          </div>

        </section>

        <section className="panel">

          <div className="section-heading">

            <div>

              <h3>Economic calendar</h3>

              <p>Upcoming market-moving fundamentals</p>

            </div>

            <span className="tag">UPCOMING</span>

          </div>

          <div className="empty-state">

            <span>◷</span>

            <strong>Calendar connection pending</strong>

            <p>

              Economic events, expected dates, times

              and impact levels will appear here.

            </p>

          </div>

        </section>

        <section className="panel">

          <h3>Trading alerts</h3>

          <div className="empty-state">

            <span>♧</span>

            <strong>Alert centre ready</strong>

            <p>

              Technical and market alerts will

              appear here once data sources are connected.

            </p>

          </div>

        </section>

        <footer>

          MarketPulse © 2026 · Market intelligence platform

          <p>Demo interface · Not financial advice</p>

        </footer>

      </main>

    </div>

  );

}

export default App;
