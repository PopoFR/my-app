import './App.css';
import {Link} from "react-router-dom";




function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Link to="/Detail"> Detail </Link>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
