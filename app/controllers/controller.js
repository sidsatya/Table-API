// module that holds the create, delete, and update table methods.
// also holds methods for showing all entries, deleting a single entry,
// and deleting all entries from the table.

const Table = require('../models/model.js');

// create and save a new entry
exports.create = (req, res) => {
    //create an entry
    const newEntry = new Table({
        title: req.body.title || "New Entry",
        content: req.body.content
    });

    //save entry in database and catch errors
    newEntry.save()
        .then(data => {
            res.write("An entry was created with the following properties: ");
            res.write(JSON.stringify(data, null, 2));
            res.end();
            console.log("new entry created!");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the entry."
            });
        });
};

// update an entry identified by the entryId in the request
exports.update = (req, res) => {
    // find entry and update it with the request body
    Table.findByIdAndUpdate(req.body.entryId, {
        title: req.body.title,
        content: req.body.content
    }, {new: true})
        //error catching
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Entry not found with id " + req.body.entryId
                });
            }
            return res.send(
                "An entry was updated with the following properties: " + data
            );
            console.log("updated entry with id: " + req.body.entryId);
        }).catch(err => {
            if(err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Entry not found with id " + req.body.entryId
                });
            }
            return res.status(500).send({
                message: "Error updating entry with id " + req.body.entryId
            });
        });
};

// delete an entry with the specified entryId in the request
exports.delete = (req, res) => {
    Table.findByIdAndRemove(req.body.entryId)
        //error catching
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Entry not found with id " + req.body.entryId
                });
            }
            res.send("An entry with the following properties was deleted: " + data);
            console.log("Entry with id: " + req.body.entryId + " deleted successfully");
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Entry not found with id " + req.body.entryId
                });
            }
            return res.status(500).send({
                message: "Could not delete entry with id " + req.body.entryId
            });
        });
};

// deletes all entries in the table
exports.deleteAll = (req, res) => {
    Table.remove({}).exec();
    res.send("All entries have been removed from the table");
};

// outputs the contents of all entries in the table
exports.show = (req, res) => {
    Table.find({}, function(err, items) {
        if (err) throw err;
        // object of all the users
        res.write("The contents of the table are: ");
        res.write(JSON.stringify(items, null, 2));
        res.end();
    });
};

// query a specific string -- not fully implemented yet
exports.query = (req, res) => {
    Table.find({"$title": { "$content": req.body.query }});
};
