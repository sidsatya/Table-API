<b>Description:</b>
A basic API using Node.js and MongoDB that supports creating, deleting, and updating entries within a table in MongoDB. A "table" is equivalent to a MongoDB collection and an "entry" is a MongoDB document.

<b>Files:</b>

1. server.js - the entry point of the API. Imports necessary express, mongoose, and bodyParser modules, connects to database, and listens on port 3000 for any requests.  

2. app/models/model.js - defines the schema for a table with entries that can be created, deleted, or updated. The fields for the entries are two strings: title and content.

3. app/routes/routes.js - defines the routes for the supported requests to the server and forwards them to the appropriate controller functions.

4. app/controllers/controller.js - module that holds the create, delete, and update table methods.
