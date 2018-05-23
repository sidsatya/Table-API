module.exports = (app) => {
    const tables = require('../controllers/table.controller.js');

    // create a new table
    app.post('/', tables.create);

    // update a table given a tableId
    app.put('/:tableId', tables.update);

    // delete a table given a tableId
    app.delete('/:tableId', tables.delete);
}
