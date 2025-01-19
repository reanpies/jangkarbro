// src/pages/api/menu.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Jangkar');

      const menuItems = await db
        .collection('MenuItem')
        .find()
        .toArray();

      // Return the data as JSON
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  } else {
    // If not a GET request, return 405 (Method Not Allowed)
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
