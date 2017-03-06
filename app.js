let db = require('./services/db.service');

db.query({
    querySQL: 'SELECT * FROM books WHERE id=$1',
    queryArgs: [2]
})
.then((res) => {
    console.log(res);
});