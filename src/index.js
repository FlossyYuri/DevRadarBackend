const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');
const { MONGO_URL } = require('../.env');
const app = express();
const server = http.Server(app);
const url = MONGO_URL;
const dev = app.get('env') !== 'production';
if (!dev) {
  url = process.env.MONGO_URL;
}

setupWebsocket(server);
mongoose.connect(url || MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
