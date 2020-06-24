const express = require('express');
const app = express();

const parseUrl = require('./routes/parseUrl')

app.use('/parseTimezone', parseUrl);

app.listen(3333,()=>{
    console.log('listen on port:3333')
});
