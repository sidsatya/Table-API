const Table = require('../models/table.model.js');

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
            res.send(data);
            console.log("new table created successfully");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Table."
            });
        });
};

// update a table identified by the tableId in the request
exports.update = (req, res) => {
    // find table and update it with the request body
    Table.findByIdAndUpdate(req.params.tableId, {
        title: req.body.title,
        content: req.body.content
    }, {new: true})
        //error catching
        .then(table => {
            if(!table) {
                return res.status(404).send({
                    message: "Table not found with id " + req.params.tableId
                });
            }
            res.send(table);
            console.log("updated table with id: " + req.params.tableId);
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Table not found with id " + req.params.tableId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.tableId
            });
        });
};

// delete a table with the specified tableId in the request
exports.delete = (req, res) => {
    Table.findByIdAndRemove(req.params.tableId)
        //error catching
        .then(table => {
            if(!table) {
                return res.status(404).send({
                    message: "Table not found with id " + req.params.tableId
                });
            }
            res.send({message: "Table with id: " + req.params.tableId + " deleted successfully"});
            console.log("Table with id: " + req.params.tableId + " deleted successfully");
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Table not found with id " + req.params.tableId
                });
            }
            return res.status(500).send({
                message: "Could not delete table with id " + req.params.tableId
            });
        });
};
