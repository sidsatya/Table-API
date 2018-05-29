// defines the routes for the different create, read, and update table requests
// to the server and forwards them to the appropriate controller functions.
module.exports = (app) => {
    const tables = require('../controllers/controller.js');

    // create a new table
    app.post("/", (req, res) => {  //testing
        tables.create(req, res);
    });

    // update a table given an existing tableId -- HTML
    app.post("/update", (req, res) => {
        tables.update(req, res);
    })

    // delete a talbe given an existing tableId -- HTML
    app.post("/deleteOne", (req, res) => {
        tables.delete(req, res);
    });

    // delete all tables in the collection
    app.post('/deleteAll', tables.deleteAll);

    // show all tables in the collection
    app.get('/show', tables.show);

    /*
    // update a table given an existing tableId
    app.put("/", (req, res) => {
        tables.update(req, res);
    });


    // delete a table given an existing tableId
    app.delete('/:tableId', tables.delete);
    */
}
