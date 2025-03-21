console.log('123');
try {
  const express = require('express');
  const app = express();
  app.get('/api/users', (req, res) => {
    res.json([
      { id: 1, name: 'bob' },
      { id: 2, name: 'bob1' },
      { id: 3, name: 'adfasd' },
    ]);
  });
  app.listen(3000);
} catch (erro) {
  console.log(err);
}
