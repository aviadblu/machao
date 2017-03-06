let pg = require('pg');

const config = {
    user: 'eibo',
    database: 'eibo_db',
    password: 'eibo2017',
    host: 'deep-mantis-922.db.databaselabs.io',
    port: 5432,
    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000,
};

class DbService {

    constructor() {
        this.pool = new pg.Pool(config);
        this.pool.on('error', function (err, client) {
            console.error('idle client error', err.message, err.stack)
        })
    }

    query(options) {

        if (!options.queryArgs) {
            options.queryArgs = [];
        }

        return new Promise((resolve, reject) => {
            this.pool.connect((err, client, done) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                client.query(options.querySQL, options.queryArgs, function (err, result) {
                    //call `done()` to release the client back to the pool
                    done();
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(result.rows);
                });

            });
        });
    }
}

let DbInstance = new DbService();

module.exports = DbInstance;