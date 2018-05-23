// defines the routes for the different create, read, and update table requests
// to the server and forwards them to the appropriate controller functions. 

module.exports = (app) => {
    const tables = require('../controllers/controller.js');

    // create a new table
    app.post('/', tables.create);

    // update a table given an existing tableId
    app.put('/:tableId', tables.update);

    // delete a table given an existing tableId
    app.delete('/:tableId', tables.delete);
}
