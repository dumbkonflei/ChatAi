const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const openai = new OpenAI({apiKey:});

console.log(openai);

app.get('/', async (req, res) => {
    res.sendFile(process.cwd()+ '/index.html')})

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
}); data