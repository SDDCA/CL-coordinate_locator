import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/salvar', (req, res) => {
    const { lat, lgn } = req.body;

    if (!lat || !lgn) {
        return res.status(400).send('Dados inválidos');
    }

    fs.writeFile('coordenadas.json', JSON.stringify({ lat, lgn }, null, 2), (err) => {
        if (err) return res.status(500).send('Erro ao salvar');
        res.send('Coordenadas salvas com sucesso!');
    });
});

app.listen(3000, () => {
    console.log('Backend rodando em http://localhost:3000');
});
