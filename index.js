const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `.env.${NODE_ENV}`
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));


const openai = new OpenAI({apiKey:`${process.env.API_KEY}`});

console.log(openai);

app.post('/enviar-mensaje', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ 
                role: "system", 
                content: req.body.message }],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);
        
        res.json(completion.choices[0].message.content);
        
    }
     catch (error) {
        console.error('Error al llamar a OpenAI:', error);
        console.log(error.data);
        res.status(500).send('Ocurrió un error al procesar su solicitud.');
    }
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



