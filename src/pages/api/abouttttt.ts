// src/pages/api/about.ts    
import { NextApiRequest, NextApiResponse } from 'next';    
import clientPromise from '@/lib/mongodb';    
    
export default async function handler(req: NextApiRequest, res: NextApiResponse) {    
  if (req.method === 'GET') {    
    try {    
      const client = await clientPromise;    
      const db = client.db('Jangkar'); // Replace with your database name    
    
      const aboutData = await db    
        .collection('AboutSection') // Replace with your collection name    
        .findOne(); // Change to findOne to return a single document    
    
      // Return the data as JSON    
      res.status(200).json(aboutData);    
    } catch (error) {    
      console.error('Database Error:', error);    
      res.status(500).json({ error: 'Failed to fetch about data' });    
    }    
  } else {    
    // If not a GET request, return 405 (Method Not Allowed)    
    res.status(405).json({ error: 'Method Not Allowed' });    
  }    
}    
