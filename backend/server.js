// Import the necessary libraries
const express = require('express');
const dotenv = require('dotenv');
const {Configuration, OpenAI} = require("openai");
const bodyParser = require('body-parser');
const cors = require("cors");


// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Setup CORs
app.use(cors());

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Create an index route which returns a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to our A.I Backend!');
});

// Create a "message" route which returns a JSON response
app.post('/message', async (req, res) => {


    try {
        const {prompt, previousMessage} = req.body;
        console.log('Request Body:', req.body);


        let messages = [];

        if(previousMessage){
          messages[0] = {
            "role" : "assistant",
            "content": previousMessage
          }
        }

        messages.push({"role": "user", "content": prompt})

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages

          })


    console.log('API Response:', chatCompletion);
          /*
          {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
          {"role": "user", "content": "Where was it played?"}
          */

          res.json({
            message : chatCompletion.choices[0].message.content,
            role: chatCompletion.choices[0].message.role
          });
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({ error: 'Error occurred while processing the request' });
    }

  



  
});

// The port the app will listen on
const PORT = process.env.PORT || 1330;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});