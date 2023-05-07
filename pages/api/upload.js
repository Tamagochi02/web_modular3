import fetch from 'node-fetch';

export default async (req, res) => {
  const { method, body } = req;

  try {
    const response = await fetch('https://web-production-77aa.up.railway.app/posts/a', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};