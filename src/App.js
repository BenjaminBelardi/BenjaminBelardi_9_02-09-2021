
import './style/App.css';
import { BrowserRouter as Router , Route, Switch} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
      </Router>
    </div>
  );
}

export default App;
