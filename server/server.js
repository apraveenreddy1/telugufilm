const express = require('express')
const app = express()
const port = 8081

app.get('/api/home', (req, res) => {
    res.json({ message: "Hello World!" });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });