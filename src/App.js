import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  const  handle = (model)=>{
    setSelectedModel(model.description); 
  }

  useEffect(() => {
    fetch('http://localhost:11000/')
      .then((res) => res.json())
      .then((result) => {
        setModels(result);
      });
  }, []);

  return (
    <ul>
      <>
      <h1>Hello Welcome to AI Explorer</h1>
      <h4>Explore And try different AI models for free</h4>
      {models.map((model) => (
        <React.Fragment key={model.id}>
        <li>
            <button onClick={() => handle(model)}>{model.name}</button>
        </li>
        {selectedModel === model.description && (
            <div>
            <h5>{selectedModel}</h5>
            <Link to={`/models/${model.id}/try`}  className='Try-button'>
              Try
            </Link>
            <br></br><br></br><br></br>
            </div>
        )}
    
        </React.Fragment>
      
      ))}
  

      </>

    </ul>
  

  );
}





export default App;

