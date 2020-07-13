const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');
const app = express();
const server = http.Server(app);
let url = process.env.MONGO_URL;
if (!process.env.MONGO_URL) {
  url = require('../.env').MONGO_URL;
}
setupWebsocket(server);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
