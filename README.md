A basic API using Node.js and MongoDB that supports creating, deleting, and updating tables in mongodb. 

<b>Files:</b>

server.js - the entry point of the API. Imports necessary express, mongoose, and bodyParser modules, connects to database, and listens on port 3000 for any requests.  

app/models/model.js - defines the schema for a table that can be created, deleted, or updated. The fields for the table are two strings: title and content. 

app/routes/routes.js - defines the routes for the supported requests to the server and forwards them to the appropriate controller functions. 

app/controllers/controller.js - module that holds the create, delete, and update table methods.




