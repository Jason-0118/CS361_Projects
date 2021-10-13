const express = require('express');
const { randomBytes } = require('crypto');
const app = express();
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { message } = req.body;
    posts[id] = { id, message };
});


var PORT = 8080;
app.listen(PORT, () => {
    console.log(`Service listening at ${PORT}`);
});
