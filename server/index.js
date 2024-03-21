import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pipeline } from '@xenova/transformers';
import * as toxicity from '@tensorflow-models/toxicity';

dotenv.config();
const app = express();
const port =  process.env.PORT || 11000; 


app.use(cors());
app.use(bodyParser.json());

let model_loaded_1 = false;
let model_1;
toxicity.load(0.9).then((x) => { model_loaded_1 = true; model_1 = x; });

app.get('/', (req, res) => {
    return res.json([
        {
            "id":1,
            "name": "Toxicity Detector",
            "description": "Toxicity Detector is a pre-trained model that can detect toxic comments in a conversation. It can be used to filter out toxic comments from a conversation."
        },
        {
            "id":2,
            "name": "Sentiment Analyser",
            "description": "Sentiment Analysis is a pre-trained model that can detect the sentiment of a conversation. It can be used to detect the sentiment of a conversation.It is using @xenova/transformers library."
        },
        {
            "id":3,
            "name": "Text Summarizer",
            "description": "Text Summarizer is a pre-trained model that can summarize a conversation. It can be used to summarize a conversation. It is using @xenova/transformers library."
        },
    ]);
}
);


app.post('/toxicity', async (req, res) => {
    while (!model_loaded_1) {};
    const { prompt } = req.body;
    try {
        let predictions = await model_1.classify(prompt);
        predictions = predictions.filter((x) => x.label == "toxicity")[0].results[0].probabilities[1];
        return res.json({ output: predictions });
    } catch (error) {
        console.error('Error loading model:', error);
        return res.status(500);
    }
});

let model_loaded_2 = false;
let model_2;
pipeline('sentiment-analysis',"Xenova/distilbert-base-uncased-finetuned-sst-2-english").then((x) => { model_loaded_2 = true; model_2 = x; });
app.post('/sentiment-analyzer', async (req, res) => {
    while (!model_loaded_2) {};
    const {prompt } = req.body;
    try {
        let predictions = await model_2(prompt);
        return res.json({ label: predictions[0].label, score: predictions[0].score });
    } catch (error) {
        console.error('Error loading model:', error);
        return res.status(500);
    }
}
);

let model_loaded_3 = false;
let model_3;
await pipeline("summarization", "Xenova/distilbart-cnn-6-6").then((x) => { model_loaded_3 = true; model_3 = x; });
app.post('/summarizer', async (req, res) => {
    const {prompt } = req.body;
    while (!model_loaded_3) {    }
        
    try {       

        let output = await model_3(prompt);
        console.log(output[0].summary_text);
        return res.json({ answer:output[0].summary_text});
    } catch (error) {
        console.error('Error loading model:', error);
        return res.status(500);
    }
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
