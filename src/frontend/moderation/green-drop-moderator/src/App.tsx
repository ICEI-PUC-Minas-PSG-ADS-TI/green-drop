import React from 'react';
import { ModeratorDashboard } from './components/ModeratorDashboard';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModeratorDashboard />
    </div>
  );
}

export default App;