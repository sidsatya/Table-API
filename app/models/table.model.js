const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Table', TableSchema);
