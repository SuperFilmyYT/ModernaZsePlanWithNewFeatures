#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/data/:filename', (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(__dirname, 'data', filename);
  
  // Security: prevent path traversal
  if (!filepath.startsWith(path.join(__dirname, 'data'))) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.send(data);
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Serwer uruchomiony na http://localhost:${PORT}`);
});
