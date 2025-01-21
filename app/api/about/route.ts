import { connectToDatabase } from '@/lib/mongoo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection('AboutSection').findOne({});
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const updateData = await request.json();
    
    await db.collection('AboutSection').updateOne(
      { _id: { $exists: true } },
      { $set: updateData },
      { upsert: true }
    );
    
    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating data' }, { status: 500 });
  }
}