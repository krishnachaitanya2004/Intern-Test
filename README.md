# AI Model Spaces - React Application

## Overview

This React application is designed for a hiring task and is focused on AI models that are pre-trained models from Hugging Face and TensorFlow.js.

## Getting Started
To run the application, follow these steps:
## 1) Go to the directory 
  After running `git clone ` do `cd Intern-Test` to access the project
## 2) Install dependencies:
### `npm install`
This command installs the necessary dependencies required for running the project <br />
## 3) Start the project:
### `cd frontend && npm start`
## 4) Start the server:
### `cd backend && npm start`

Please dont give inputs to the models until you see `server is running on port 11000` in `cd backend` because at start ai models need to fetch
## Optimizations for Model Load Time :
## Initial Challenge:
Upon initial attempts, it was observed that the model's load time was significant. The model's description (fetched from db.json) was being acquired during this time. This led to errors for users attempting to run queries.

## Resolution:
The solution involved running `node server.js` to address the issue before initiating the application. This successfully resolved the initial challenge by ensuring the model's description is fetched before the user attempts to run queries.

## Load Time Optimization
After resolving the initial challenge, the focus shifted to optimizing the model's load time. To avoid consuming excessive time and cost with every user query, the model is loaded before posting the route. The route waits until the model is loaded, ensuring a faster response for subsequent queries.
