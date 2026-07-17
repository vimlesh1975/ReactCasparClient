// server/routes/aiProxy.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // node-fetch v2 works with CommonJS

// Helper to ensure the API key exists
function getApiKey() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error('OpenRouter API key not set in server environment');
  }
  return key;
}

// Image generation endpoint
router.post('/image', async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await fetch('https://openrouter.ai/api/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiKey()}`,
      },
      body: JSON.stringify({ model: 'openai/dall-e-2', prompt, n: 1 }),
    });
    if (!resp.ok) {
      const txt = await resp.text();
      return res.status(resp.status).json({ error: `OpenRouter image error ${resp.status}: ${txt}` });
    }
    const data = await resp.json();
    const imgUrl = data?.data?.[0]?.url;
    if (!imgUrl) return res.status(500).json({ error: 'No image URL returned from OpenRouter' });
    res.json({ url: imgUrl });
  } catch (err) {
    console.error('AI image proxy error', err);
    res.status(500).json({ error: err.message });
  }
});

// Component generation endpoint (Fabric.js code)
router.post('/component', async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await fetch('https://openrouter.ai/api/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiKey()}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-pro',
        temperature: 0.2,
        max_tokens: 500,
        messages: [{ role: 'user', content: `Generate JavaScript code (using Fabric.js) that creates one or more Fabric objects based on the description: "${prompt}". Return only the code expression, e.g. a fabric.Rect(...) or [fabric.Circle(...), fabric.Text(...)]` }],
      }),
    });
    if (!resp.ok) {
      const txt = await resp.text();
      return res.status(resp.status).json({ error: `OpenRouter component error ${resp.status}: ${txt}` });
    }
    const result = await resp.json();
    const code = result?.choices?.[0]?.message?.content?.trim();
    if (!code) return res.status(500).json({ error: 'No code returned from OpenRouter' });
    res.json({ code });
  } catch (err) {
    console.error('AI component proxy error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
