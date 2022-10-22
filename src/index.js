import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import WordContext from './components/context/Context';
import words from '../src/data/data.json';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
  const [state, setState] = useState(words);
  // console.log(state);

  return (
    <React.StrictMode>
      <WordContext.Provider value={{ state, setState }}>
        <App />
      </WordContext.Provider>
    </React.StrictMode>
  )
}

root.render(
  <Main />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

