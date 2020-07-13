const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');
const url = process.env.MONGO_URL;
if (!url) const { MONGO_URL } = require('../.env');
const app = express();
const server = http.Server(app);
const dev = app.get('env') !== 'production';

setupWebsocket(server);
mongoose.connect(url || MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
