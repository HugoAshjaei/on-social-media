const http = require('http'),
    express = require("express"),
    bodyParser = require("body-parser");

// Initializing the server(app)
const app = express();

// Routes
app.use(`/api/virgool`, require(`./routes/api/virgool`));
// TODO instagram
// TODO telegram
// TODO linkedin
// TODO twitter
// TODO medium
// TODO facebook
// TODO github
// Create http server
app.listen(3000, () => console.log("Server run at port 3000"));
