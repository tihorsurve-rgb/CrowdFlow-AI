
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FanDashboard from './pages/FanDashboard';
import OpsDashboard from './pages/OpsDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar">
          <div className="brand">CrowdFlow AI</div>
          <div className="nav-links">
            <Link to="/">Fan View</Link>
            <Link to="/ops">Ops Dashboard</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<FanDashboard />} />
            <Route path="/ops" element={<OpsDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;