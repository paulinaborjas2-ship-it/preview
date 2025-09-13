const express = require('express');
const cors = require('cors');
const { getInstagramPosts } = require('./notion-fetch');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getInstagramPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});
