
import './App.css';
import RadarPerf from './components/RadarChart';
import AverageSession from './components/LineChart';
import Score from './components/PieChart';

function App() {
  return (
    <div className="App">
      <RadarPerf />
      <AverageSession />
      <Score />
    </div>
  );
}

export default App;
