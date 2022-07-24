const express = require('express');
const app = express();
const port = 3000;
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.get('/getList', (req, res) => {
  res.json({
    data: [{ text: 'sss擦拭' }, { text: '的撒满课的撒' }, { text: ' massage' }, { text: '大声说' }]
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
