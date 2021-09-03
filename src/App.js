import './App.css';
import RadarPerf from './components/RadarChart';
import AverageSession from './components/LineChart';

function App() {
  return (
    <div className="App">
      <RadarPerf />
      <AverageSession />
    </div>
  );
}

export default App;
