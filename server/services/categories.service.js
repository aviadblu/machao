let db = require('./db.service');

class CategoriesService {
    dataValidator(data) {
        return new Promise((resolve, reject) => {
            if (!data) {
                return reject('no data');
            }

            // requires data
            if (!data.name) {
                return reject('Please provide category name');
            }

            resolve(data);
        });
    }


    insertNewCategory(data) {
        return this.dataValidator(data)
            .then((data) => {
                return db.query(`INSERT INTO categories(name)
                                VALUES ($1) RETURNING *;`, [data.name]);
            });
    }

    updateCategory(id, data) {
        return this.dataValidator(data)
            .then((data) => {
                return db.query(`UPDATE categories
                                SET 
                                name=$1,
                                WHERE id=$2
                                RETURNING *; `, [data.name, id]);
            });
    }

    deleteCategory(id) {
        return db.query(`DELETE FROM categories WHERE id=$1;`, [id]).then(() => {
            return 'success';
        });
    }

    get() {
        const filterSql = arguments[0] ? arguments[0] : '';
        const params = arguments[1] ? arguments[1] : [];
        return db.query(`SELECT * FROM categories ${filterSql};`, params);
    }

}

let CategoriesSvc = new CategoriesService();

module.exports = CategoriesSvc;
