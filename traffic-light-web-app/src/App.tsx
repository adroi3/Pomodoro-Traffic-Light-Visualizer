import React from 'react';
import './App.css';
import StartOrStopPomodoroButton from "./Components/StartOrStopPomodoroButton/StartOrStopPomodoroButton";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <StartOrStopPomodoroButton isStarted={false} />
      </header>
      <footer className="App-footer">
        <div>Icons made by <a
          className="App-link"
          href="https://www.flaticon.com/authors/darius-dan"
          title="Darius Dan">Darius Dan
        </a> from <a
            className="App-link"
            href="https://www.flaticon.com/"
            title="Flaticon">www.flaticon.com</a> is licensed by <a
              className="App-link"
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
      </footer>
    </div>
  );
}

export default App;
