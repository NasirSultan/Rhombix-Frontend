import React from 'react';
import AdminPanel from './components/AdminPanel';
import MatchSetup from './components/MatchSetup';
import ScoreBoard from './components/ScoreBoard';
import Chart from './components/Chart';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Cricket Match Manager</h1>
      <AdminPanel />
      <MatchSetup />
      {/* You can integrate actual match data here */}
      <ScoreBoard match={{ teamA: 'Team A', teamB: 'Team B' }} />
      <Chart data={[]} />
    </div>
  );
}

export default App;
