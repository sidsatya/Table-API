// defines the schema for a table that can be created, deleted, or updated.
// the fields for the table are two strings: title and content.

const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Table', TableSchema);
