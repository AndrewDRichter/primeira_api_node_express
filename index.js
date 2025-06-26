const express = require("express");

const server = express();
const port = 3000;
server.use(express.json())

const cursos = ['NodeJS', 'JavaScript', 'React', 'NextJS']


server.use((req, res, next) => {
    console.log(`URL chamada: ${req.url}`);
    return next();
})

function checkCurso(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ error: "Nome do curso é obrigatório." })
    }
    if (!req.body.name) {
        return res.status(400).json({ error: "Verifique a sintaxe do campo name." })
    }

    return next();
}

function checkIndex(req, res, next) {
    const curso = cursos[req.params.index];
    if (!curso) {
        res.status(404).json({ error: "Curso não existente." })
    }

    req.curso = curso;

    return next();
}

server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', checkIndex, checkIndex, (req, res) => {
    // const { index } = req.params;
    if (req.curso) return res.json(req.curso)
    else return res.json({ error: 'Não há curso com esse index.' })
})

server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body;
    cursos.push(name);
    return res.json(name);
})

server.put('/cursos/:index', checkIndex, checkCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;
    return res.json(cursos);
})

server.delete('/cursos/:index', checkIndex, (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);
    return res.json(cursos);
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});