import { useState } from 'react';

function FanDashboard() {
  const [showRoute, setShowRoute] = useState(false);
  const [routeData] = useState({
    eta_minutes: 2,
    to_zone: 'East Concessions'
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Fan View</h1>
        <p className="page-subtitle">Your live event guide</p>
      </div>

      <div className="card alert-card">
        <h2>High Congestion Detected</h2>
        <p>Main Concession - Level 1 is experiencing heavy delays. Consider alternatives.</p>
      </div>

      <div className="card recommend-card">
        <h2>AI Recommends</h2>
        <p>Head to East Concessions. It is only a 2 min walk and has a 0 min wait time.</p>

        <div style={{ marginTop: '16px' }}>
          <button
            className="button-primary"
            onClick={() => setShowRoute(prev => !prev)}
          >
            {showRoute ? 'Hide Route' : 'Start Routing'}
          </button>
        </div>

        {showRoute && routeData && (
          <div className="route-panel">
            <div className="route-eta">
              ⏱ ETA: {routeData.eta_minutes} min
            </div>

            <p><strong>Destination:</strong> {routeData.to_zone}</p>

            <h3 className="route-title">🤖 Smart Route Guidance</h3>

            <div className="route-map">
              <div className="route-item">
                <div className="route-node active">You</div>
                <div className="route-line">
                  <span className="arrow arrow-1">➜</span>
                  <span className="arrow arrow-2">➜</span>
                  <span className="arrow arrow-3">➜</span>
                </div>
              </div>

              <div className="route-item">
                <div className="route-node">Corridor A</div>
                <div className="route-line">
                  <span className="arrow arrow-1">➜</span>
                  <span className="arrow arrow-2">➜</span>
                  <span className="arrow arrow-3">➜</span>
                </div>
              </div>

              <div className="route-item">
                <div className="route-node">Gate B</div>
                <div className="route-line">
                  <span className="arrow arrow-1">➜</span>
                  <span className="arrow arrow-2">➜</span>
                  <span className="arrow arrow-3">➜</span>
                </div>
              </div>

              <div className="route-item">
                <div className="route-node destination">East Concessions</div>
              </div>
            </div>

            <div className="route-steps">
              <p>• Walk straight for 1 minute through Corridor A</p>
              <p>• Turn right at Gate B signage</p>
              <p>• Reach East Concessions in about 2 minutes</p>
              <p>• Avoid Main Concession due to heavy congestion</p>
            </div>
          </div>
        )}
      </div>

      <h2 className="section-title">Live Zone Status</h2>

      <div className="zone-grid">
        <div className="zone-card">
          <h3 className="zone-name">North Gate Access</h3>
          <p className="zone-meta">Wait Time: 5 min</p>
          <p className="zone-meta">Crowd Density: 45%</p>
          <span className="badge status-moderate">Moderate</span>
        </div>

        <div className="zone-card">
          <h3 className="zone-name">Main Concession - Level 1</h3>
          <p className="zone-meta">Wait Time: 18 min</p>
          <p className="zone-meta">Crowd Density: 87%</p>
          <span className="badge status-congested">Congested</span>
        </div>

        <div className="zone-card">
          <h3 className="zone-name">East Concessions</h3>
          <p className="zone-meta">Wait Time: 0 min</p>
          <p className="zone-meta">Crowd Density: 12%</p>
          <span className="badge status-normal">Open</span>
        </div>
      </div>
    </div>
  );
}

export default FanDashboard;