// defines the routes for the different create, read, and update table requests
// to the server and forwards them to the appropriate controller functions.

module.exports = (app) => {
    const entries = require('../controllers/controller.js');

    // create a new entry
    app.post("/", (req, res) => {
        entries.create(req, res);
    });

    // update an entry given an existing entryId -- HTML
    app.post("/update", (req, res) => {
        entries.update(req, res);
    })

    // delete an entry given an existing entryId -- HTML
    app.post("/deleteOne", (req, res) => {
        entries.delete(req, res);
    });

    // delete all entries in the table
    app.post('/deleteAll', entries.deleteAll);

    // show all entries in the table
    app.get('/show', entries.show);

    app.post('/query', (req, res) => {
        entries.query(req, res);
    });
    /*
    // update a table given an existing tableId
    app.put("/", (req, res) => {
        tables.update(req, res);
    });


    // delete a table given an existing tableId
    app.delete('/:tableId', tables.delete);
    */
}
