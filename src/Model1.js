import React, { useState } from "react";
import './App.css';
import axios from 'axios';


function Model1() {
    const [inputText, setInputText] = useState("");
    const [maxPrediction, setMaxPrediction] = useState(null);
    const backendURL = 'http://localhost:11000/toxicity';

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
            <h1>Test Toxicity Detection Model</h1>
            <h4>Enter your text to test the model</h4>
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
                    <h4>On Analyzing text We assume it toxicity with a  </h4>
                    <h4>Probability: {maxPrediction.output}</h4>
                </div>
            )}
        </div>
    );
}

export default Model1;
