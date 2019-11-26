const express = require('express');
const cors = require('cors');
const monk = require('monk');


const app = express();
const db = monk('localhost/meower'); //creating db named mewor in mongo
const mews = db.get('mews');  //creating mews named collection in db


app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        "message" : "mewwww 😻 🐈"
    })
});

function isValidMew(mew){
    return mew.name && mew.name.toString().trim() != '' &&
    mew.content && mew.content.toString().trim() != '';
}

app.post('/mews', (req, res) => {
    if (isValidMew(req.body)){
        //insert into db...
        const mew = {
            name : req.body.name.toString(),
            content : req.body.content.toString(), //required as no JS script is injected in db
            created : new Date()
        };

        mews.insert(mew)
            .then(createdMew => {
                res.json(createdMew);
            });

    }
    else{
        res.status(422);
        res.json({
            message : 'Hey! Name and Content are required!'
        });
    }
});

app.listen(3000, ()=> {
    console.log("Listening on port http://localhost:3000");
});