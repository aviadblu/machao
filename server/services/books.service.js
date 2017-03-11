let db = require('./db.service');

class BooksService {
    dataValidator(data) {
        return new Promise((resolve, reject) => {
            if (!data) {
                return reject('no data');
            }

            // requires data
            if (!data.name) {
                return reject('Please provide book name');
            }
            if (!data.category) {
                return reject('Please provide book category');
            }
            if (!data.author) {
                return reject('Please provide book author');
            }

            // optional data
            if (!data.publish_date) {
                data.publish_date = '';
            }
            if (!data.price) {
                data.price = 0;
            }
            if (!data.model) {
                data.model = '';
            }
            if (!data.cover_url) {
                data.cover_url = '';
            }
            if (!data.sku) {
                data.sku = new Date().getTime();
            }
            if (!data.summary) {
                data.summary = '';
            }

            data.last_update = parseInt(new Date().getTime());

            resolve(data);
        });
    }


    insertNewBook(data) {
        return this.dataValidator(data)
            .then((data) => {
                return db.query(`INSERT INTO books(
                                publish_date, price, category, model, name, author, cover_url, 
                                sku, last_update, summary)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, [
                    data.publish_date,
                    data.price,
                    data.category,
                    data.model,
                    data.name,
                    data.author,
                    data.cover_url,
                    data.sku,
                    data.last_update,
                    data.summary,
                ]);
            });
    }

    updateBook(id, data) {
        return this.dataValidator(data)
            .then((data) => {
                return db.query(`UPDATE books
                                SET 
                                publish_date=$1, 
                                price=$2, 
                                category=$3, 
                                model=$4, 
                                name=$5, 
                                author=$6, 
                                cover_url=$7, 
                                sku=$8, 
                                last_update=$9, 
                                summary=$10 
                                WHERE id=$11
                                RETURNING *; `, [
                    data.publish_date,
                    data.price,
                    data.category,
                    data.model,
                    data.name,
                    data.author,
                    data.cover_url,
                    data.sku,
                    data.last_update,
                    data.summary,
                    id
                ]);
            });
    }

    deleteBook(id) {
        return db.query(`DELETE FROM books WHERE id=$1;`, [id]).then(() => {
            return 'success';
        });
    }

    get() {
        const filterSql = arguments[0] ? arguments[0] : '';
        const params = arguments[1] ? arguments[1] : [];
        return db.query(`SELECT
        books.id, 
        books.name, 
        books.author,  
        books.sku,
        books.summary,
        books.category,
        books.cover_url,
        categories.name as category_name
        FROM books INNER JOIN categories 
        ON books.category = categories.id 
        ORDER BY books.name ASC
        ${filterSql};`, params);
    }

}

let BookSvc = new BooksService();

module.exports = BookSvc;
