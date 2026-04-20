import { useState } from 'react';

import {
  getStatusClass,
  deployStaffToZones,
  rerouteCrowdAcrossZones,
  type Zone,
} from '../utils/crowdLogic';

function OpsDashboard() {
  const [zones, setZones] = useState<Zone[]>([
    {
      name: 'Gate A Entrance',
      queue: 2,
      density: 30,
      status: 'normal',
    },
    {
      name: 'Concession B',
      queue: 25,
      density: 92,
      status: 'congested',
    },
    {
      name: 'Section 114 Stairs',
      queue: 0,
      density: 45,
      status: 'normal',
    },
    {
      name: 'East Washrooms',
      queue: 4,
      density: 55,
      status: 'moderate',
    },
  ]);

  const [staffDeployed, setStaffDeployed] = useState(false);
  const [rerouteActive, setRerouteActive] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // ✅ CLEAN: using utility function
  const handleDeployStaff = () => {
    if (staffDeployed) return;

    const updatedZones = deployStaffToZones(zones);

    setZones(updatedZones);
    setStaffDeployed(true);
    setActionMessage(
      '2 extra staff members deployed to Concession B. Queue time is improving.'
    );
  };

  // ✅ CLEAN: using utility function
  const handleRerouteCrowd = () => {
    if (rerouteActive) return;

    const updatedZones = rerouteCrowdAcrossZones(zones);

    setZones(updatedZones);
    setRerouteActive(true);
    setActionMessage(
      'Crowd rerouting activated. Fans are being redirected away from Concession B.'
    );
  };

  const congestedZones = zones.filter(
    (zone) => zone.status === 'congested'
  ).length;

  const avgWaitTime = Math.round(
    zones.reduce((sum, zone) => sum + zone.queue, 0) / zones.length
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Operations Command</h1>
        <p className="page-subtitle">
          Monitoring {zones.length} active zones in real-time.
        </p>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">System Status</div>
          <div className="kpi-value">Live</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Active Zones</div>
          <div className="kpi-value">{zones.length}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Congested Zones</div>
          <div className="kpi-value">{congestedZones}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Avg Wait Time</div>
          <div className="kpi-value">{avgWaitTime} min</div>
        </div>
      </div>

      <div className="card alert-card">
        <h2>Critical Alert</h2>
        <p>
          Concession B is experiencing severe congestion with high wait time and
          density.
        </p>
      </div>

      <div className="card recommend-card">
        <h2>AI Recommended Action</h2>
        <p>
          Redirect fans toward East Concessions and deploy 2 extra staff members
          to Concession B to reduce bottlenecks.
        </p>

        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="button-primary"
            onClick={handleDeployStaff}
            disabled={staffDeployed}
            aria-label="Deploy staff to reduce congestion at Concession B"
          >
            {staffDeployed ? 'Staff Deployed' : 'Deploy Staff'}
          </button>

          <button
            className="button-secondary"
            onClick={handleRerouteCrowd}
            disabled={rerouteActive}
            aria-label="Reroute crowd away from Concession B"
          >
            {rerouteActive ? 'Reroute Active' : 'Reroute Crowd'}
          </button>
        </div>

        {actionMessage && (
          <div className="action-message" style={{ marginTop: '16px' }}>
            {actionMessage}
          </div>
        )}
      </div>

      <h2 className="section-title">Zone Status Overview</h2>

      <div className="zone-grid">
        {zones.map((zone, index) => (
          <div className="zone-card" key={index}>
            <h3 className="zone-name">{zone.name}</h3>
            <p className="zone-meta">Queue Time: {zone.queue} min</p>
            <p className="zone-meta">Density: {zone.density}%</p>
            <span
              className={getStatusClass(zone.status)}
              aria-label={`Zone status ${zone.status}`}
            >
              {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpsDashboard;