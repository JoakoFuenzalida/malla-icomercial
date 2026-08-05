import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Falta el ID del plan' });
    }

    const payload = await kv.get(`plan:${id}`);
    
    if (!payload) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }

    return res.status(200).json(payload);
  } catch (error) {
    console.error('Error loading plan:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
