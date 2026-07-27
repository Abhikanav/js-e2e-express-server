const express = require('express');
const { exec } = require('child_process');
const app = express();

// Alert 1: Hardcoded Credential
const HARDCODED_JWT_SECRET = "super_secret_plain_text_key_12345";

// Alert 2: Command Injection
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (err, stdout) => { // User input directly in exec
    res.send(stdout);
  });
});

// Alert 3: Reflected Cross-Site Scripting (XSS)
app.get('/welcome', (req, res) => {
  const username = req.query.name;
  res.send(`<h1>Welcome ${username}</h1>`); // Unsanitized HTML response
});

module.exports = app;
