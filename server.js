const express = require('express');
const app = express();
const fs = require('fs');
app.use('/', express.static('./public'));
app.listen(8080,() => {
    console.log("Server listening on port 8080");
});
app.get('/buddylist', (req, res) => {
    fs.readFile("./data/buddy-list.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
});
