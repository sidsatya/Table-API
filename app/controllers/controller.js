// module that holds the create, delete, and update table methods.
// also holds methods for showing all tables, deleting a single table,
// and deleting all tables from the collection.

const Table = require('../models/model.js');

// create and save a new table
exports.create = (req, res) => {
    //create a table
    const newTable = new Table({
        title: req.body.title || "New Table",
        content: req.body.content
    });

    //save table in database and catch errors
    newTable.save()
        .then(data => {
            res.write("A table was created with the following properties: ");
            res.write(JSON.stringify(data, null, 2));
            res.end();
            console.log("new table created!");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Table."
            });
        });
};

// update a table identified by the tableId in the request
exports.update = (req, res) => {
    // find table and update it with the request body
    Table.findByIdAndUpdate(req.body.tableId, {
        title: req.body.title,
        content: req.body.content
    }, {new: true})
        //error catching
        .then(table => {
            if(!table) {
                return res.status(404).send({
                    message: "Table not found with id " + req.body.tableId
                });
            }
            return res.send(
                "A table was updated with the following properties: " + table
            );
            console.log("updated table with id: " + req.body.tableId);
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Table not found with id " + req.body.tableId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.body.tableId
            });
        });
};

// delete a table with the specified tableId in the request
exports.delete = (req, res) => {
    Table.findByIdAndRemove(req.body.tableId)
        //error catching
        .then(table => {
            if(!table) {
                return res.status(404).send({
                    message: "Table not found with id " + req.body.tableId
                });
            }
            res.send("A table with the following properties was deleted: " + table);
            console.log("Table with id: " + req.body.tableId + " deleted successfully");
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Table not found with id " + req.body.tableId
                });
            }
            return res.status(500).send({
                message: "Could not delete table with id " + req.body.tableId
            });
        });
};

// deletes all tables in the collection
exports.deleteAll = (req, res) => {
    Table.remove({}).exec();
    res.send("All tables have been removed from the collection");
};

// outputs the contents of all tables in the collection
exports.show = (req, res) => {
    Table.find({}, function(err, items) {
        if (err) throw err;
        // object of all the users
        res.write("The contents of the collection are: ");
        res.write(JSON.stringify(items, null, 2));
        res.end();
    });
};
