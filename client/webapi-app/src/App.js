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
    <div>
      <>
        <h1>webapi-sprint-challenge App</h1>
        {state.map((project) => (
          <div key={project.id}>
            {console.log(project)}
            Name: {project.name}<br />
            Description: {project.description}<br />
            Completed: {project.completed}<br /><br /><br />
          </div>

        ))}
      </>
    </div>
  );
}

export default App;