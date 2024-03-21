import React, { useState } from "react";
import './App.css';
import axios from 'axios';


function Model3() {
    const [quesText, setquesText] = useState("");

    const [maxPrediction, setMaxPrediction] = useState(null);
    const backendURL = 'http://localhost:11000/summarizer';
    const loadModel = async () => {
       await axios.post(backendURL, { prompt: quesText })
        .then((response) => {
            console.log(response.data);
            setMaxPrediction(response.data);
        })
        .catch((error) => {
            console.error('Error loading model:', error);
        });
    };

    return (
        <div>
            <h1>Summarization model</h1>
            <h4>Give me Context to summarize</h4>
            <h4>Please wait until I process your text</h4>
            <textarea
                type="text"
                className="text-box"
                value={quesText}
                onChange={(e) => setquesText(e.target.value)}
            />
            <br/><br/><br/>
            <input
                type="submit"
                className="Try-button"
                value="Submit"
                onClick={loadModel}
            />

            {maxPrediction && (
                <div>
                  <h4>The Summarized Text is </h4>    
                 <h4>{maxPrediction.answer}</h4>
                </div>
            )}
        </div>
    );
}

export default Model3;