import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, careerKey, approved, plannedSemesters, editable } = req.body;
    
    if (!id || !careerKey) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Convert id to lowercase and replace spaces with dashes to make it url safe
    const safeId = id.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    const payload = {
      careerKey,
      approved, // Array of approved course IDs
      plannedSemesters,
      editable: !!editable,
      createdAt: Date.now()
    };

    // Save to Vercel KV
    await kv.set(`plan:${safeId}`, payload);
    
    return res.status(200).json({ success: true, safeId });
  } catch (error) {
    console.error('Error saving plan:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
