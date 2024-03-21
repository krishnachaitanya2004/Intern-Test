import React, { useState } from "react";
import './App.css';
import axios from 'axios';


function Model2() {
    const [inputText, setInputText] = useState("");
    const [maxPrediction, setMaxPrediction] = useState(null);
    const backendURL = 'http://localhost:11000/sentiment-analyzer';

    const loadModel = async () => {
       await axios.post(backendURL, { prompt: inputText })
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
            <h1>Sentiment Analyzer</h1>
            <h4>Enter your text to analyze its Sentiment</h4>
            <input
                type="text"
                id="inputText"
                name="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
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
                    
                    <h4>Please wait until I process your text</h4>
                    <h4>On Analyzing text it sems to be  </h4>
                    <h4>Label: {maxPrediction.label}</h4>
                    <h4> With a Score of</h4>
                    <h4>{maxPrediction.score}</h4>
                </div>
            )}
        </div>
    );
}

export default Model2;
