let express  = require('express');
module.exports = (app) => {

    app.use('/api/books', require('./api/books.api'));
    app.use('/api/categories', require('./api/categories.api'));

    /* APPLICATION */
    app.use(express.static('../client/dist/'));
    app.get('*', function(req, res) {
        // load index.html otherwise
        res.sendfile('../client/dist/index.html');
        //res.send('something');
    });
};
