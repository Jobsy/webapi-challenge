import React, { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';

function App() {

  const [state, setState] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/projects`)
      .then(response => {
        setState(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <>
        <h1>webapi-sprint-challenge App</h1>
        
      </>
    </div>
  );
}

export default App;