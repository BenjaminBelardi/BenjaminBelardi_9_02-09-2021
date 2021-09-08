
import './style/App.css';
import { BrowserRouter as Router , Route, Switch} from "react-router-dom";
import Header from './components/Header';
import Accueil from './pages/Accueil';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Header />
          <Accueil />
        </Route>
      </Router>
    </div>
  );
}

export default App;
