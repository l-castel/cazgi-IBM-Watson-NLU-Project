const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();


function getParams (srcType, data, analyzeType) {
    let anParams = {};
    anParams[srcType] = data;
    anParams.features = {}
    anParams.features[analyzeType] = {};
    return anParams;
}


function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-06-17',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    getNLUInstance().analyze(getParams('url', req.query.url, 'emotion'))
        .then(analysisResults => {
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            return res.send(err.toString());
        });
});

app.get("/url/sentiment", (req,res) => {
    getNLUInstance().analyze(getParams('url', req.query.url, 'sentiment',))
        .then(analysisResults => {
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            return res.send(err.toString());
        });
});

app.get("/text/emotion", (req,res) => {
    getNLUInstance().analyze(getParams('text',req.query.text, 'emotion', ))
        .then(analysisResults => {
          return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
          return res.send(err.toString());
        });
});

app.get("/text/sentiment", (req,res) => {
    getNLUInstance().analyze(getParams('text',req.query.text, 'sentiment', ))
        .then(analysisResults => {
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            return res.send(err.toString());
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

