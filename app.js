const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;




app.use(express.json());

app.post('/postAdvice', async (req,res) => {
    const numberOfCalls = req.body.numberOfCalls;

    if (!numberOfCalls || typeof numberOfCalls !== 'number' || numberOfCalls <= 0){
        return res.status(400).json({error: 'Número inválido de chamadas'});
    }

    try {
        const promises = Array.from({ length: numberOfCalls}, ()=>
        axios.get('https://api.adviceslip.com/advice')
        );

        const adResponse = await Promise.all(promises);
        const adData = adResponse.map(response => response.data.slip.advice)

        res.json({advices: adData})
    } catch (error){
        console.error('Deu Ruim')
        res.status(500).json({error: 'Erro na API externa'})
    }

    
})





app.get('/getAdvice/:numberOfCalls', async (req,res) => {
    const numberOfCalls = parseInt(req.params.numberOfCalls)

    if (!numberOfCalls || typeof numberOfCalls !== 'number' || numberOfCalls <= 0){
        return res.status(400).json({error: 'Número inválido de chamadas'});
    }

    try {
        const promises = Array.from({ length: numberOfCalls}, ()=>
        axios.get('https://api.adviceslip.com/advice')
        );

        const adResponse = await Promise.all(promises);
        const adData = adResponse.map(response => response.data.slip.advice)

        res.json({advices: adData})
    } catch (error){
        console.error('Deu Ruim')
        res.status(500).json({error: 'Erro na API externa'})
    }

    
})







app.listen(port, () => console.log(`Servidor Express iniciado na porta ${port}`));
