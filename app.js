
const express = require("express");
const path = require("path");
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/video/01', express.static(path.join(__dirname, 'util/CH01')));
app.use('/video/02', express.static(path.join(__dirname, 'util/CH02')));
app.use('/video/03', express.static(path.join(__dirname, 'util/CH03')));
app.use('/video/04', express.static(path.join(__dirname, 'util/CH04')));

app.listen(3000, () => {
  console.log('server run 3000...');
});

