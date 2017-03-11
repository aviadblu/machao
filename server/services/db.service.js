let pg = require('pg');

const config = require('../config/pg.config');

class DbService {

    constructor() {
        this.pool = new pg.Pool(config);
        this.pool.on('error', function (err, client) {
            console.error('idle client error', err.message, err.stack)
        });

        this.checkDbHealth();
    }

    checkDbHealth() {
        const tables = ['books', 'categories'];
        let promisesArray = [];

        tables.forEach((tname) => {
            promisesArray.push(this.query(`SELECT count(*) FROM ${tname}`));
        })

        return Promise.all(promisesArray)
            .then((res) => {
                console.log('DB healthy!');
                let i = 0;
                tables.forEach((tname) => {
                    console.log(`${tname}: ${res[i][0].count}`);
                    i++;
                });

            }, (err) => {
                console.error('Something is bas in DB');
                console.error(err);
            });

    }

    createTable(name) {
        const sql = require(`../models/${name}.model`).SQL;
        return this.query(sql);
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            if(!arguments[0]) {
                return reject('No sql!');
            }
            if(!arguments[1]) {
                params = [];
            }

            this.pool.connect((err, client, done) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                client.query(sql, params, function (err, result) {
                    //call `done()` to release the client back to the pool
                    done();
                    if (err) {
                        //console.error(err);
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